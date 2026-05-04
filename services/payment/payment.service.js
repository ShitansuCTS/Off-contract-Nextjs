import { razorpayInstance } from "@/lib/razorpay";

export const createOrderService = async ({ amount }) => {
  const options = {
    amount: amount || 5000, // default ₹500
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  console.log("The Data in SERVICES PAGE IS :", options);
  const order = await razorpayInstance.orders.create(options);

  console.log("THE RETURN IS :", order);
  return order;
};
