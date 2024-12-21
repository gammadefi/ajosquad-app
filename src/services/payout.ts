import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers"



export const PayoutService = {
    getPayouts: async (payload:any) => {
        const response = await createApiClient().get(`ajosquad/payout${paramsObjectToQueryString(payload)}`);
        return response 
    
    }
}
