import { createApiClient } from "../utils/api"


export const KycServices = {
    addKyc: async (payload: any, id: string) => {
        const response = await createApiClient().patch(`/user/${id}/kyc`, payload);
        return response.data;
    },

    getKyc: async (id: string) => {
        const response = await createApiClient().get(`/user/${id}/kyc`);
        return response.data;
    },
    initializeKyc: async (payload: any) => {  
        const response = await createApiClient().post(`/user/initiate-kyc`, payload);
        return response.data;
    },

    kycCallbac : async (payload: any) => {
        const response = await createApiClient().post(`/user/kyc/callback`, payload);
        return response.data;
    }
}

