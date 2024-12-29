import { createApiClient } from "../utils/api";
import { paramsObjectToQueryString } from "../utils/helpers";



export const ReferralServices = {
    getReferralStats : async(userId: string) => {
        const response = await createApiClient().get(`/ajosquad/referral/stats/${userId}`)
        return response.data
    },
    getReferredUsers : async(payload:any) => {
        const response = await createApiClient().get(`/ajosquad/referral${paramsObjectToQueryString(payload)}`)
        return response
    }
    

}