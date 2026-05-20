import { createOrderController } from "@/controllers/payments/payment.controller";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const data = await createOrderController(body);
  console.log("The Reuested Data is in the API GATE WAY PAGE:", body);

  return NextResponse.json(data);
}