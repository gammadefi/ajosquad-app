import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers";
import { guarantorApiRoutes } from "./routes"

export const guarantorServices = {
  getAllGuarantors: async(payload?: any) => {
    const response = await createApiClient().get(guarantorApiRoutes.getAllGuarantors + paramsObjectToQueryString(payload));
    return response;
  },
  getGuarantor: async(guarantorId: string) => {
    const response = await createApiClient().get(guarantorApiRoutes.getGuarantor(guarantorId));
    return response.data;
  },
  getGuarantorStats: async() => {
    const response = await createApiClient().get(guarantorApiRoutes.getGuarantorStats);
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