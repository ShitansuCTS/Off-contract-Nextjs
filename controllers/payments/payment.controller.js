import { createOrderService } from "@/services/payment/payment.service";

// Create Order Controller

export const createOrderController = async (body) => {
  console.log("The Reuested Data is in the CONTROLLER PAGE:", body);

  const order = await createOrderService({
    amount: body.amount, // coming from frontend
  });

  // ✅ RETURN THIS
  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  };
};
