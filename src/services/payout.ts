import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers"

export const PayoutService = {
    getPayouts: async (payload:any) => {
        const response = await createApiClient().get(`ajosquad/payout${paramsObjectToQueryString(payload)}`);
        return response 
    },
    getPayout: async (payoutId:any) => {
        const response = await createApiClient().get(`ajosquad/payout/${payoutId}`);
        return response 
    },
    updatePayout: async (payoutId:any, payload: any) => {
        const response = await createApiClient().patch(`ajosquad/payout/${payoutId}`, payload);
        return response 
    },
    getTotalPayout: async (payload:any) => {     
        const response = await createApiClient().get(`ajosquad/payout/total${paramsObjectToQueryString(payload)}`);
        return response 
    },
}
