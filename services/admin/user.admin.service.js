import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin.middleware";

export const getAdminUsersService = async (searchParams) => {
    await adminMiddleware();
<<<<<<< HEAD

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";
    const verificationStatus = searchParams.get("verificationStatus") || "";

=======
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const status = searchParams.get("status") || "";
    const onboardingStatus = searchParams.get("onboardingStatus") || "";
>>>>>>> 0ab8559 (insert all data)
    const skip = (page - 1) * limit;

    const where = {
        ...(role && { role }),
        ...(status && { status }),
<<<<<<< HEAD

        ...(verificationStatus && {
            company: {
                verificationStatus,
            },
        }),

=======
        ...(onboardingStatus && { onboardingStatus }),
>>>>>>> 0ab8559 (insert all data)
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
<<<<<<< HEAD
                createdAt: true,
                updatedAt: true,

                profile: true,

=======
                onboardingStatus: true,
                createdAt: true,
                updatedAt: true,
                profile: true,
>>>>>>> 0ab8559 (insert all data)
                company: {
                    include: {
                        state: true,
                        city: true,
<<<<<<< HEAD
                    },
                },

=======
                        kycApplication: true,
                    },
                },
>>>>>>> 0ab8559 (insert all data)
                subscriptions: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        id: true,
<<<<<<< HEAD
                        planName: true,
                        amount: true,
                        status: true,
                        paymentId: true,
                        startDate: true,
                        endDate: true,
                        createdAt: true,
=======
                        amount: true,
                        billingCycle: true,
                        status: true,
                        razorpaySubscriptionId: true,
                        startDate: true,
                        endDate: true,
                        cancelledAt: true,
                        createdAt: true,
                        updatedAt: true,
                        plan: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                price: true,
                                billingCycle: true,
                            },
                        },
>>>>>>> 0ab8559 (insert all data)
                    },
                },
            },
        }),
<<<<<<< HEAD

=======
>>>>>>> 0ab8559 (insert all data)
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
<<<<<<< HEAD
            createdAt: true,
            updatedAt: true,

            profile: true,

=======
            onboardingStatus: true,
            createdAt: true,
            updatedAt: true,
            profile: true,
>>>>>>> 0ab8559 (insert all data)
            company: {
                include: {
                    state: true,
                    city: true,
<<<<<<< HEAD
                },
            },

=======
                    kycApplication: true,
                },
            },
>>>>>>> 0ab8559 (insert all data)
            subscriptions: {
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
<<<<<<< HEAD
                    planName: true,
                    amount: true,
                    status: true,
                    paymentId: true,
                    startDate: true,
                    endDate: true,
                    createdAt: true,
                    updatedAt: true,
=======
                    amount: true,
                    billingCycle: true,
                    status: true,
                    razorpaySubscriptionId: true,
                    startDate: true,
                    endDate: true,
                    cancelledAt: true,
                    createdAt: true,
                    updatedAt: true,
                    plan: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            price: true,
                            billingCycle: true,
                        },
                    },
>>>>>>> 0ab8559 (insert all data)
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

<<<<<<< HEAD
    const verificationStatus =
        user.company?.verificationStatus || "PROFILE_PENDING";
=======

    const kycApplication = user.company?.kycApplication;

    const kycApproved =
        kycApplication?.status === "VERIFIED" ||
        user.onboardingStatus === "SUBSCRIPTION_PENDING" ||
        user.onboardingStatus === "ACTIVE";

    const kycRejected =
        kycApplication?.status === "REJECTED" ||
        user.onboardingStatus === "KYC_REJECTED";
>>>>>>> 0ab8559 (insert all data)

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
<<<<<<< HEAD
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
=======
            key: "KYC_REVIEW",
            label: "Admin Verification",
            completed: kycApproved,
            status: kycRejected ? "REJECTED" : undefined,
            reason: kycApplication?.rejectionReason || undefined,
        },
        {
            key: "SUBSCRIPTION",
            label: "Subscription",
            completed:
                hasActiveSubscription ||
                user.onboardingStatus === "ACTIVE",
        },
        {
            key: "ACTIVE",
            label: "Account Active",
            completed: user.onboardingStatus === "ACTIVE",
>>>>>>> 0ab8559 (insert all data)
        },
    ];

    return {
        user,
        timeline,
    };
};