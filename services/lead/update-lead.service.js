import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middleware/admin.middleware";
import { z } from "zod";

const updateLeadSchema = z.object({
    status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED", "REJECTED"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    adminNotes: z.string().trim().max(5000).nullable().optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one lead field is required",
});

export const updateLeadService = async (leadId, body) => {
    await adminMiddleware();

    const validatedData = updateLeadSchema.parse(body);

    const existingLead = await prisma.lead.findUnique({
        where: { id: leadId },
        select: { id: true },
    });

    if (!existingLead) {
        const error = new Error("Lead not found");
        error.statusCode = 404;
        throw error;
    }

    return prisma.lead.update({
        where: { id: leadId },
        data: validatedData,
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            subject: true,
            message: true,
            formType: true,
            status: true,
            priority: true,
            sourcePage: true,
            sourceWebsite: true,
            adminNotes: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
