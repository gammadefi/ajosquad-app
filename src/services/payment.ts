import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers"



export const PaymentService = {
    getPayments: async (payload:any) => {
        const response = await createApiClient().get(`ajosquad/payments${paramsObjectToQueryString(payload)}`);
        return response 
    },
    getPayment: async (paymentId:any) => {
        const response = await createApiClient().get(`ajosquad/payments/${paymentId}`);
        return response 
    },
    getTotalPayment: async (payload:any) => {     
        const response = await createApiClient().get(`ajosquad/payments/total${paramsObjectToQueryString(payload)}`);
        return response 
    },

    getCashFLow: async () => {
        const response = await createApiClient().get(`ajosquad/payments/cash-flow`);
        return response 
    }
}
