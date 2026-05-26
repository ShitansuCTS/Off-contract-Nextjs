import { NextResponse } from "next/server";
import { getMeController } from "@/controllers/auth/auth.controller";

export async function GET(req) {
    try {
        const user = await getMeController(req);

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Something went wrong",
            },
            { status: error.statusCode || 500 }
        );
    }
}