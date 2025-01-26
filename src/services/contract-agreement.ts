import { createApiClient } from "../utils/api"
import { contractAgreementApiRoutes } from "./routes"

export const contractAgreementServices = {
  user: {
    getAllContractAgreements: async() => {
      const response = await createApiClient().get(contractAgreementApiRoutes.user.getAllContractAgreements);
      return response.data;
    },
    getContractAgreement: async(id: string) => {
      const response = await createApiClient().get(contractAgreementApiRoutes.user.getContractAgreement(id));
      return response.data;
    },
    agreeOrRejectContractAgreement: async(id: string, payload: any) => {
      const response = await createApiClient().post(contractAgreementApiRoutes.user.getContractAgreement(id), payload);
      return response.data;
    }
  },
  admin: {
    getAllContractAgreements: async() => {
      const response = await createApiClient().get(contractAgreementApiRoutes.admin.getAllContractAgreements);
      return response.data;
    },
    getContractAgreement: async(id: string) => {
      const response = await createApiClient().get(contractAgreementApiRoutes.admin.getContractAgreement(id));
      return response.data;
    },
    createContractAgreement: async(payload: any) => {
      const response = await createApiClient().post(contractAgreementApiRoutes.admin.createAgreement, payload);
      return response.data;
    },
    deleteContractAgreement: async(id: string) => {
      const response = await createApiClient().delete(contractAgreementApiRoutes.admin.getContractAgreement(id));
      return response.data;
    },
    updateContractAgreement: async(id: string, payload: any) => {
      const response = await createApiClient().patch(contractAgreementApiRoutes.admin.getContractAgreement(id), payload);
      return response.data;
    }
  }
}