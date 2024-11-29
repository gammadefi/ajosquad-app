import { createApiClient } from "../utils/api"


export const KycServices = {
    addKyc: async (payload: any, id: string) => {
        const response = await createApiClient().post(`/user/${id}/kyc`, payload);
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

