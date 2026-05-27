import { z } from "zod";

export const completeProfileSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name is required")
        .max(100, "Full name is too long"),

    phone: z
        .string()
        .trim()
        .min(10, "Valid phone number is required")
        .max(15, "Phone number is too long"),

    companyName: z
        .string()
        .trim()
        .min(2, "Company name is required")
        .max(150, "Company name is too long"),

    gstNumber: z
        .string()
        .trim()
        .max(20, "GST number is too long")
        .optional()
        .or(z.literal("")),

    category: z
        .string()
        .trim()
        .min(2, "Business category is required")
        .max(100, "Category is too long"),

    experience: z.coerce
        .number()
        .min(0, "Experience cannot be negative")
        .max(100, "Experience is too high")
        .optional(),

    city: z
        .string()
        .trim()
        .max(100, "City is too long")
        .optional()
        .or(z.literal("")),

    state: z
        .string()
        .trim()
        .max(100, "State is too long")
        .optional()
        .or(z.literal("")),
});