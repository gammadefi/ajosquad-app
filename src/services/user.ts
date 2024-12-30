import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers";
import { userApiRoutes } from "./routes"

export const userServices = {
  user: {
    getMe: async () => {
      const response = await createApiClient().get(userApiRoutes.user.getMe);
      return response.data;
    },
    getUserById: async (userId: string) => {
      const response = await createApiClient().get(userApiRoutes.user.getUserById(userId));
      return response.data;
    },
    getAllUsers: async (payload: any) => {
      const response = await createApiClient().get(userApiRoutes.user.getAllUsers+ paramsObjectToQueryString(payload));
      return response.data;
    },
    updateUserPersonalInfo: async (userId: string, payload: any) => {
      const response = await createApiClient().patch(userApiRoutes.user.updateUserPersonal(userId), payload);
      return response.data;
    },
    updateUserEmployerInfo: async (userId: string, payload: any) => {
      const response = await createApiClient().patch(userApiRoutes.user.updateUserEmployer(userId), payload);
      return response.data;
    },
    changePassword: async (payload: any, userId: string) => {
      const response = await createApiClient().patch(userApiRoutes.user.changePassword(userId), payload);
      return response.data;
    },
    countAll: async () => {
      const response = await createApiClient().get(userApiRoutes.user.countAll);
      return response.data;
    }
  },
  kyc: {
    getKYC: async (userId: string) => {
      const response = await createApiClient().get(userApiRoutes.kyc.getKYC(userId));
      return response.data;
    },
    createKYC: async (userId: string, payload: any) => {
      const response = await createApiClient().post(userApiRoutes.kyc.createKYC(userId), payload);
      return response.data;
    },
    updateKYC: async (userId: string, payload: any) => {
      const response = await createApiClient().patch(userApiRoutes.kyc.updateKYC(userId), payload);
      return response.data;
    }
  },
  bank: {
    getAllBanks: async () => {
      const response = await createApiClient().get(userApiRoutes.bank.getAllBanks);
      return response.data;
    },
    getBank: async (bankId: string) => {
      const response = await createApiClient().get(userApiRoutes.bank.getBank(bankId));
      return response.data;
    },
    createBank: async (payload: any) => {
      const response = await createApiClient().post(userApiRoutes.bank.createBank, payload);
      return response.data;
    },
    updateBank: async (bankId: string, payload: any) => {
      const response = await createApiClient().patch(userApiRoutes.bank.updateBank(bankId), payload);
      return response.data;
    },
    deleteBank: async (bankId: string) => {
      const response = await createApiClient().delete(userApiRoutes.bank.deleteBank(bankId));
      return response.data;
    }
  },
  guarantor: {
    getAllGuarantors: async (userId: string) => {
      const response = await createApiClient().get(userApiRoutes.guarantor.getAllGuarantors(userId));
      return response.data;
    },
    getGuarantor: async (userId: string, guarantorId: string) => {
      const response = await createApiClient().get(userApiRoutes.guarantor.getGuarantor(guarantorId));
      return response.data;
    },
    addGuarantor: async (userId: string, payload: any) => {
      const response = await createApiClient().post(userApiRoutes.guarantor.addGuarantor, payload);
      return response.data;
    },
    updateGuarantor: async (userId: string, guarantorId: string, payload: any) => {
      const response = await createApiClient().patch(userApiRoutes.guarantor.updateGuarantor(guarantorId), payload);
      return response.data;
    }
  }
}