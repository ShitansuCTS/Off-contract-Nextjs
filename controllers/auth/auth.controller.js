import { registerService } from "@/services/auth/auth.service";
import { loginService } from "@/services/auth/auth.service";

// REGISTER
export const registerController = async (body) => {
  console.log("CONTROLLER BODY:", body);

  return registerService(body);
};

// LOGIN
export const loginController = async (body) => {
  console.log("LOGIN CONTROLLER BODY:", body);

  return loginService(body);
};
