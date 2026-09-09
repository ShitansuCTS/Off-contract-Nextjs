import { z } from "zod";

export const createLeadSchema = z.object({
    firstName: z.string().trim().min(2, "First name is required").max(80).optional(),
    lastName: z.string().trim().max(80).optional(),

    name: z.string().trim().max(160).optional(),

    email: z.string().trim().email("Valid email is required").max(254),
    phone: z.string().trim().min(10, "Valid phone number is required").max(30),

    subject: z.string().trim().max(160).optional(),
    message: z.string().trim().max(5000).optional(),
    productName: z.string().trim().max(160).optional(),
    serviceName: z.string().trim().max(160).optional(),

    formType: z.enum([
        "CONTACT",
        "ENQUIRY",
        "MATERIAL_INQUIRY",
        "EQUIPMENT_RENTAL",
        "INSURANCE",
        "FINANCE",
        "SERVICE_REQUEST",
        "GENERAL",
    ]),

    sourcePage: z.string().trim().max(500).optional(),
    sourceWebsite: z.string().trim().max(500).optional(),
}).superRefine((data, ctx) => {
    if (!data.name && !data.firstName) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["name"],
            message: "Name is required",
        });
    }
});