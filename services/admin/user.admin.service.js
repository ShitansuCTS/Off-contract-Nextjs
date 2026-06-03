import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin.middleware";

export const getAdminUsersService = async (searchParams) => {
    await adminMiddleware();

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";
    const verificationStatus = searchParams.get("verificationStatus") || "";

    const skip = (page - 1) * limit;

    const where = {
        ...(role && { role }),
        ...(status && { status }),

        ...(verificationStatus && {
            company: {
                verificationStatus,
            },
        }),

        ...(search && {
            OR: [
                {
                    email: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    profile: {
                        fullName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    profile: {
                        phone: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    company: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    company: {
                        gstNumber: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        }),
    };

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,

                profile: true,

                company: {
                    include: {
                        state: true,
                        city: true,
                    },
                },

                subscriptions: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        id: true,
                        planName: true,
                        amount: true,
                        status: true,
                        paymentId: true,
                        startDate: true,
                        endDate: true,
                        createdAt: true,
                    },
                },
            },
        }),

        prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        users,
        pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    };
};

export const getAdminUserDetailsService = async (userId) => {
    await adminMiddleware();

    if (!userId) {
        const error = new Error("User ID is required");
        error.statusCode = 400;
        throw error;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,

            profile: true,

            company: {
                include: {
                    state: true,
                    city: true,
                },
            },

            subscriptions: {
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    planName: true,
                    amount: true,
                    status: true,
                    paymentId: true,
                    startDate: true,
                    endDate: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const hasProfile = Boolean(user.profile);
    const hasCompany = Boolean(user.company);
    const hasActiveSubscription = user.subscriptions.some(
        (subscription) => subscription.status === "ACTIVE"
    );

    const verificationStatus =
        user.company?.verificationStatus || "PROFILE_PENDING";

    const timeline = [
        {
            key: "REGISTERED",
            label: "Account Registered",
            completed: true,
        },
        {
            key: "PROFILE_COMPLETED",
            label: "Business Profile Completed",
            completed: hasProfile && hasCompany,
        },
        {
            key: "SUBSCRIPTION_COMPLETED",
            label: "Subscription Completed",
            completed: hasActiveSubscription,
        },
        {
            key: "PENDING_APPROVAL",
            label: "Sent for Admin Review",
            completed:
                verificationStatus === "PENDING_APPROVAL" ||
                verificationStatus === "VERIFIED" ||
                verificationStatus === "REJECTED",
        },
        {
            key: "VERIFIED",
            label:
                verificationStatus === "REJECTED"
                    ? "Verification Rejected"
                    : "Verification Approved",
            completed:
                verificationStatus === "VERIFIED" ||
                verificationStatus === "REJECTED",
            status: verificationStatus,
            reason: user.company?.rejectionReason || null,
        },
    ];

    return {
        user,
        timeline,
    };
};