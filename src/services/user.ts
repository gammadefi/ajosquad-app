import { createApiClient } from "../utils/api"
import { userApiRoutes } from "./routes"

export const userServices = {
  user: {
    getMe: async() => {
      const response = await createApiClient().get(userApiRoutes.user.getMe);
      return response.data;
    },
    getUserById: async(userId: string) => {
      const response = await createApiClient().get(userApiRoutes.user.getUserById(userId));
      return response.data;
    },
    getAllUsers: async() => {
      const response = await createApiClient().get(userApiRoutes.user.getAllUsers);
      return response.data;
    },
    updateUser: async(userId: string, payload: any) =>{
      const response = await createApiClient().patch(userApiRoutes.user.updateUser(userId), payload);
      return response.data;
    }
  },
  kyc: {
    getKYC: async(userId: string) => {
      const response = await createApiClient().get(userApiRoutes.kyc.getKYC(userId));
      return response.data;
    },
    createKYC: async(userId: string, payload: any) => {
      const response = await createApiClient().post(userApiRoutes.kyc.createKYC(userId), payload);
      return response.data;
    },
    updateKYC: async(userId: string, payload: any) =>{
      const response = await createApiClient().patch(userApiRoutes.kyc.updateKYC(userId), payload);
      return response.data;
    }
  },
  bank: {
    getAllBanks: async(userId: string) => {
      const response = await createApiClient().get(userApiRoutes.bank.getAllBanks(userId));
      return response.data;
    },
    getBank: async(userId: string, bankId: string) => {
      const response = await createApiClient().get(userApiRoutes.bank.getBank(userId, bankId));
      return response.data;
    },
    createBank: async(userId: string, payload: any) =>{
      const response = await createApiClient().post(userApiRoutes.bank.createBank(userId), payload);
      return response.data;
    }
  },
  guarantor: {
    getAllGuarantors: async(userId: string) => {
      const response = await createApiClient().get(userApiRoutes.guarantor.getAllGuarantors(userId));
      return response.data;
    },
    getGuarantor: async(userId: string, guarantorId: string) => {
      const response = await createApiClient().get(userApiRoutes.guarantor.getGuarantor(userId, guarantorId));
      return response.data;
    },
    addGuarantor: async(userId: string, payload: any) => {
      const response = await createApiClient().post(userApiRoutes.guarantor.addGuarantor(userId), payload);
      return response.data;
    },
    updateGuarantor: async(userId: string, guarantorId: string, payload: any) =>{
      const response = await createApiClient().patch(userApiRoutes.guarantor.updateGuarantor(userId, guarantorId), payload);
      return response.data;
    }
  }
}