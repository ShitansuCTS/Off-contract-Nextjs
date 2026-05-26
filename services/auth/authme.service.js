import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";

export const getMeService = async (req) => {
    const authUser = await authMiddleware(req);

    if (!authUser) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        throw error;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: authUser.id,
        },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            profile: {
                select: {
                    fullName: true,
                    phone: true,
                },
            },
            company: {
                select: {
                    name: true,
                    category: true,
                    city: true,
                    state: true,
                    verificationStatus: true,
                },
            },
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};