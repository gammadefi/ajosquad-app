import { createApiClient } from "../utils/api"
import { contractAgreementApiRoutes } from "./routes"

export const contractAgreementServices = {
  getAllContractAgreements: async() => {
    const response = await createApiClient().get(contractAgreementApiRoutes.getAllContractAgreements);
    return response.data;
  },
  getContractAgreement: async(id: string) => {
    const response = await createApiClient().get(contractAgreementApiRoutes.getContractAgreement(id));
    return response.data;
  },
  createContractAgreement: async(payload: any) => {
    const response = await createApiClient().post(contractAgreementApiRoutes.createAgreement, payload);
    return response.data;
  },
  deleteContractAgreement: async(id: string) => {
    const response = await createApiClient().delete(contractAgreementApiRoutes.getContractAgreement(id));
    return response.data;
  },
  updateContractAgreement: async(id: string, payload: any) => {
    const response = await createApiClient().patch(contractAgreementApiRoutes.getContractAgreement(id), payload);
    return response.data;
  }
}