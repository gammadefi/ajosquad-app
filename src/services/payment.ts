import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers"



export const PaymentService = {
    getPayments: async (payload:any) => {
        const response = await createApiClient().get(`ajosquad/payments${paramsObjectToQueryString(payload)}`);
        return response 
    
    }
}
