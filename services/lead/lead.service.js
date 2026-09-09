import { prisma } from "@/lib/prisma";
import { createLeadSchema } from "@/validations/lead.validation";
import validator from "validator";
import xss from "xss";

export const createLeadService = async (body, req) => {

    // VALIDATE INPUT
    const validatedData = createLeadSchema.parse(body);

    const fullName =
        validatedData.name ||
        [validatedData.firstName, validatedData.lastName].filter(Boolean).join(" ").trim() ||
        "Customer";

    const autoSubject = validatedData.subject ||
        (validatedData.productName ? `Enquiry for ${validatedData.productName}` : "New Service Inquiry");

    const autoMessage = validatedData.message ||
        (validatedData.productName ? `I am interested in ${validatedData.productName}. Please contact me.` : "");

    // GET IP
    const forwarded = req.headers.get("x-forwarded-for");

    const ipAddress = forwarded ? forwarded.split(",")[0] : null;

    // SANITIZE INPUT
    const cleanData = {
        name: xss(fullName || "Customer"),
        email: validator.normalizeEmail(validatedData.email),
        phone: validator.escape(validatedData.phone),

        subject: xss(autoSubject || "New Service Inquiry"),
        message: xss(autoMessage || ""),

        formType: validatedData.formType,

        sourcePage: xss(validatedData.sourcePage || ""),
        sourceWebsite: xss(validatedData.sourceWebsite || ""),

        ipAddress,
    };

    const normalizedBody = {
        name: cleanData.name,
        email: cleanData.email,
        phone: cleanData.phone,
        subject: cleanData.subject,
        message: cleanData.message,
        formType: cleanData.formType,
        productName: validatedData.productName || null,
        serviceName: validatedData.serviceName || null,
        sourcePage: cleanData.sourcePage,
        sourceWebsite: cleanData.sourceWebsite,
    };

    // CREATE LEAD
    const lead = await prisma.lead.create({
        data: {
            name: cleanData.name,
            email: cleanData.email,
            phone: cleanData.phone,

            subject: cleanData.subject,
            message: cleanData.message,

            formType: cleanData.formType,

            sourcePage: cleanData.sourcePage,
            sourceWebsite: cleanData.sourceWebsite,
            ipAddress: cleanData.ipAddress,

            formData: normalizedBody,
        },
    });

    return lead;
};