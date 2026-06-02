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
        .optional()
        .or(z.literal(""))
        .refine(
            (val) =>
                !val ||
                /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
                    val.toUpperCase()
                ),
            "Enter valid 15 digit GST number"
        ),

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

    stateId: z.string().uuid("Please select a valid state"),

    cityId: z.string().uuid("Please select a valid city"),
});