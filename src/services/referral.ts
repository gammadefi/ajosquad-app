import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/helpers";



export const ReferralServices = {
    getReferralStats : async(payload: string) => {
        const response = await createApiClient().get(`/ajosquad/referral/stats${paramsObjectToQueryString(payload)}`)
        return response.data
    },
    getReferredUsers : async(payload:any) => {
        const response = await createApiClient().get(`/ajosquad/referral${paramsObjectToQueryString(payload)}`)
        return response
    }
    

}