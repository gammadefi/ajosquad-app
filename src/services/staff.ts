import { createApiClient } from "../utils/api"


export const StaffService = {
    getAllStaff : async (payload: any) => {
        const response =  await createApiClient().get('/staff', {params: payload})
        return response
    },
    staffCount : async () => {
        const response =  await createApiClient().get('/staff/countAll')
        return response.data
    }

}