import { createApiClient } from "../utils/api"
import { guarantorApiRoutes } from "./routes"

export const guarantorServices = {
  getAllGuarantors: async() => {
    const response = await createApiClient().get(guarantorApiRoutes.getAllGuarantors);
    return response.data;
  },
  getGuarantor: async(guarantorId: string) => {
    const response = await createApiClient().get(guarantorApiRoutes.getGuarantor(guarantorId));
    return response.data;
  },
  addGuarantor: async(payload: any) => {
    const response = await createApiClient().post(guarantorApiRoutes.addGuarantor, payload);
    return response.data;
  },
  updateGuarantor: async(guarantorId: string, payload: any) =>{
    const response = await createApiClient().patch(guarantorApiRoutes.updateGuarantor(guarantorId), payload);
    return response.data;
  },
  deleteGuarantor: async(guarantorId: string) =>{
    const response = await createApiClient().delete(guarantorApiRoutes.updateGuarantor(guarantorId));
    return response.data;
  }
}