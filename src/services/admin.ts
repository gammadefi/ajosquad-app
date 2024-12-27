import { createApiClient } from "../utils/api";
import { adminApiRoutes } from "./routes";

export const adminServices = {
  updateAdminInformation: async (payload:any) => {
    const response = await createApiClient().patch(adminApiRoutes.updateAdminInformation, payload);
    return response.data;
  }
}