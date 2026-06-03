import validator from "validator";
import xss from "xss";

import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";
import { completeProfileSchema } from "@/validations/profile.validation";

export const completeProfileService = async (body, req) => {
    console.log("COMPLETE PROFILE SERVICE BODY:", body);

    const authUser = await authMiddleware(req);

    if (!authUser) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        throw error;
    }

    const validatedData = completeProfileSchema.parse(body);

    const cleanData = {
        fullName: xss(validatedData.fullName),
        phone: validator.escape(validatedData.phone),

        companyName: xss(validatedData.companyName),

        gstNumber: validatedData.gstNumber
            ? validator.escape(validatedData.gstNumber.toUpperCase())
            : null,

        category: xss(validatedData.category),

        experience:
            validatedData.experience !== undefined
                ? Number(validatedData.experience)
                : null,

        stateId: validatedData.stateId,
        cityId: validatedData.cityId,
    };

    const user = await prisma.user.findUnique({
        where: {
            id: authUser.id,
        },
        select: {
            id: true,
            role: true,
            status: true,
            profile: true,
            company: true,
        },
    });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.role === "ADMIN") {
        const error = new Error("Admin does not need business profile verification");
        error.statusCode = 403;
        throw error;
    }

    if (user.status !== "ACTIVE") {
        const error = new Error("Your account is suspended");
        error.statusCode = 403;
        throw error;
    }

    const companyUpdateData = {
        name: cleanData.companyName,
        gstNumber: cleanData.gstNumber,
        category: cleanData.category,
        experience: cleanData.experience,
        stateId: cleanData.stateId,
        cityId: cleanData.cityId,
    };

    if (
        !user.company ||
        user.company.verificationStatus === "REJECTED"
    ) {
        companyUpdateData.verificationStatus = "PROFILE_PENDING";
    }

    const result = await prisma.$transaction(async (tx) => {
        const profile = await tx.profile.upsert({
            where: {
                userId: user.id,
            },
            update: {
                fullName: cleanData.fullName,
                phone: cleanData.phone,
            },
            create: {
                userId: user.id,
                fullName: cleanData.fullName,
                phone: cleanData.phone,
            },
        });

        const company = await tx.company.upsert({
            where: {
                userId: user.id,
            },
            update: companyUpdateData,
            create: {
                userId: user.id,
                name: cleanData.companyName,
                gstNumber: cleanData.gstNumber,
                category: cleanData.category,
                experience: cleanData.experience,
                stateId: cleanData.stateId,
                cityId: cleanData.cityId,
                verificationStatus: "PROFILE_PENDING",
            },
        });

        return {
            profile,
            company,
        };
    });

    console.log("COMPLETE PROFILE SERVICE RESULT:", result);

    return result;
};