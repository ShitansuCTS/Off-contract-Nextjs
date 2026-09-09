import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { updateLeadService } from "@/services/lead/update-lead.service";

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const lead = await updateLeadService(id, body);

        return NextResponse.json({
            success: true,
            message: "Lead updated successfully",
            data: lead,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof ZodError
                    ? error.issues[0]?.message || "Invalid lead update"
                    : error?.message || "Something went wrong",
            },
            { status: error?.statusCode || (error instanceof ZodError ? 400 : 500) },
        );
    }
}
