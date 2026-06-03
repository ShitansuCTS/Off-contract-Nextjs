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
            company: {
                verificationStatus: "PENDING_APPROVAL",
            },
            subscriptions: {
                some: {
                    status: "ACTIVE",
                },
            },
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            profile: true,
            company: {
                include: {
                    state: true,
                    city: true,
                },
            },
            subscriptions: {
                where: {
                    status: "ACTIVE",
                },
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
        orderBy: {
            createdAt: "desc",
        },
    });

    return vendors;
};

export const approveVendorService = async (userId) => {
    await adminMiddleware();

    const vendor = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            profile: true,
            company: true,
            subscriptions: {
                where: {
                    status: "ACTIVE",
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

    if (!vendor.subscriptions.length) {
        const error = new Error("Vendor does not have active subscription");
        error.statusCode = 400;
        throw error;
    }

    if (vendor.company.verificationStatus !== "PENDING_APPROVAL") {
        const error = new Error("Vendor is not pending approval");
        error.statusCode = 400;
        throw error;
    }

    return await prisma.company.update({
        where: {
            userId,
        },
        data: {
            verificationStatus: "VERIFIED",
            rejectionReason: null,

        },
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
        where: { id: userId },
        include: {
            company: true,
        },
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

    if (vendor.company.verificationStatus !== "PENDING_APPROVAL") {
        const error = new Error("Vendor is not pending approval");
        error.statusCode = 400;
        throw error;
    }

    return await prisma.company.update({
        where: {
            userId,
        },
        data: {
            verificationStatus: "REJECTED",
            rejectionReason: reason,
        },
    });
};