import { createLeadService } from "@/services/lead/lead.service";

export const createLeadController = async (body, req) => {
    console.log("LEAD CONTROLLER BODY:", body);

    return createLeadService(body, req);
};