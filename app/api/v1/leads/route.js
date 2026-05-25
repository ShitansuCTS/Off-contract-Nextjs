import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createLeadController } from "@/controllers/lead/lead.controller";

export async function POST(req) {
    try {
        const body = await req.json();

        console.log("CREATE LEAD API BODY:", body);

        const lead = await createLeadController(body, req);

        return NextResponse.json(
            {
                success: true,
                message: "Lead submitted successfully",
                lead,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.log("CREATE LEAD ERROR:", error);

        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.issues[0].message,
                },
                {
                    status: 400,
                },
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: error?.message || "Something went wrong",
            },
            {
                status: 400,
            },
        );
    }
}