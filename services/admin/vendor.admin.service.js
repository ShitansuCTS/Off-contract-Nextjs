import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin.middleware";

export const getPendingVendorsService = async () => {
    await adminMiddleware();

    const vendors = await prisma.user.findMany({
        where: {
            role: {
                in: ["SUPPLIER", "AGENCY"],
            },
            status: "ACTIVE",
<<<<<<< HEAD
            company: {
                verificationStatus: "PENDING_APPROVAL",
            },
            subscriptions: {
                some: {
                    status: "ACTIVE",
                },
            },
=======
            onboardingStatus: "KYC_UNDER_REVIEW",
>>>>>>> 0ab8559 (insert all data)
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
<<<<<<< HEAD
=======
            onboardingStatus: true,
>>>>>>> 0ab8559 (insert all data)
            createdAt: true,
            profile: true,
            company: {
                include: {
                    state: true,
                    city: true,
<<<<<<< HEAD
                },
            },
            subscriptions: {
                where: {
                    status: "ACTIVE",
                },
=======

                    // NEW: Get KYC application details
                    kycApplication: true,
                },
            },
            subscriptions: {
>>>>>>> 0ab8559 (insert all data)
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
        orderBy: {
            createdAt: "desc",
        },
    });

    return vendors;
};

export const approveVendorService = async (userId) => {
    await adminMiddleware();

    const vendor = await prisma.user.findUnique({
<<<<<<< HEAD
        where: { id: userId },
        include: {
            profile: true,
            company: true,
            subscriptions: {
                where: {
                    status: "ACTIVE",
=======
        where: {
            id: userId,
        },
        include: {
            profile: true,
            company: {
                include: {
                    // NEW: Get KYC application before approval
                    kycApplication: true,
>>>>>>> 0ab8559 (insert all data)
                },
            },
        },
    });

    if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
    }

    if (!["SUPPLIER", "AGENCY"].includes(vendor.role)) {
        const error = new Error("Only supplier or agency can be approved");
        error.statusCode = 400;
        throw error;
    }

    if (!vendor.profile || !vendor.company) {
        const error = new Error("Vendor profile is incomplete");
        error.statusCode = 400;
        throw error;
    }

<<<<<<< HEAD
    if (!vendor.subscriptions.length) {
        const error = new Error("Vendor does not have active subscription");
        error.statusCode = 400;
        throw error;
    }

    if (vendor.company.verificationStatus !== "PENDING_APPROVAL") {
=======
    if (vendor.onboardingStatus !== "KYC_UNDER_REVIEW") {
>>>>>>> 0ab8559 (insert all data)
        const error = new Error("Vendor is not pending approval");
        error.statusCode = 400;
        throw error;
    }

<<<<<<< HEAD
    return await prisma.company.update({
        where: {
            userId,
        },
        data: {
            verificationStatus: "VERIFIED",
            rejectionReason: null,

        },
=======
    // NEW: Make sure KYC application exists
    if (!vendor.company.kycApplication) {
        const error = new Error("KYC application not found");
        error.statusCode = 400;
        throw error;
    }

    // NEW: Make sure KYC application is under review
    if (vendor.company.kycApplication.status !== "UNDER_REVIEW") {
        const error = new Error("KYC application is not pending review");
        error.statusCode = 400;
        throw error;
    }

    // NEW: Update KYC application and user together
    return await prisma.$transaction(async (tx) => {
        await tx.kycApplication.update({
            where: {
                companyId: vendor.company.id,
            },
            data: {
                status: "VERIFIED",
                verifiedAt: new Date(),
                rejectedAt: null,
                rejectionReason: null,
                correctionRequired: false,
            },
        });

        return await tx.user.update({
            where: {
                id: userId,
            },
            data: {
                onboardingStatus: "SUBSCRIPTION_PENDING",
            },
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                onboardingStatus: true,
            },
        });
>>>>>>> 0ab8559 (insert all data)
    });
};

export const rejectVendorService = async (userId, body) => {
    await adminMiddleware();

    const reason = body?.reason?.trim();

    if (!reason) {
        const error = new Error("Rejection reason is required");
        error.statusCode = 400;
        throw error;
    }

    const vendor = await prisma.user.findUnique({
<<<<<<< HEAD
        where: { id: userId },
        include: {
            company: true,
        },
=======
        where: {
            id: userId,
        },
        include: {
            company: {
                include: {
                    // NEW: Get KYC application before rejection
                    kycApplication: true,
                },
            },
        },
    });

    console.log("REJECT VENDOR DEBUG:", {
        userId,
        reason,
        vendorFound: !!vendor,
        role: vendor?.role,
        onboardingStatus: vendor?.onboardingStatus,
        companyFound: !!vendor?.company,
        kycApplicationFound: !!vendor?.company?.kycApplication,
        kycStatus: vendor?.company?.kycApplication?.status,
>>>>>>> 0ab8559 (insert all data)
    });

    if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
    }

    if (!["SUPPLIER", "AGENCY"].includes(vendor.role)) {
        const error = new Error("Only supplier or agency can be rejected");
        error.statusCode = 400;
        throw error;
    }

    if (!vendor.company) {
        const error = new Error("Vendor company profile not found");
        error.statusCode = 400;
        throw error;
    }

<<<<<<< HEAD
    if (vendor.company.verificationStatus !== "PENDING_APPROVAL") {
=======
    if (vendor.onboardingStatus !== "KYC_UNDER_REVIEW") {
>>>>>>> 0ab8559 (insert all data)
        const error = new Error("Vendor is not pending approval");
        error.statusCode = 400;
        throw error;
    }

<<<<<<< HEAD
    return await prisma.company.update({
        where: {
            userId,
        },
        data: {
            verificationStatus: "REJECTED",
            rejectionReason: reason,
        },
=======
    // NEW: Make sure KYC application exists
    if (!vendor.company.kycApplication) {
        const error = new Error("KYC application not found");
        error.statusCode = 400;
        throw error;
    }

    // NEW: Make sure KYC application is under review
    if (vendor.company.kycApplication.status !== "UNDER_REVIEW") {
        const error = new Error("KYC application is not pending review");
        error.statusCode = 400;
        throw error;
    }

    // NEW: Save rejection reason in KYC application
    // and update user status together
    return await prisma.$transaction(async (tx) => {
        await tx.kycApplication.update({
            where: {
                companyId: vendor.company.id,
            },
            data: {
                status: "REJECTED",
                rejectedAt: new Date(),
                rejectionReason: reason,
                correctionRequired: true,
            },
        });

        return await tx.user.update({
            where: {
                id: userId,
            },
            data: {
                onboardingStatus: "KYC_REJECTED",
            },
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                onboardingStatus: true,
            },
        });
>>>>>>> 0ab8559 (insert all data)
    });
};