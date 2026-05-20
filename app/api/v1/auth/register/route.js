import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { registerController } from "@/controllers/auth/auth.controller";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("API BODY:", body);

    const data = await registerController(body);

    return NextResponse.json({
      success: true,
      message: "User Registered Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    // ZOD VALIDATION ERROR
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

    // NORMAL ERROR
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
