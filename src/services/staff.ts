import { createApiClient } from "../utils/api"

export const StaffService = {
    getAllStaff : async (payload: any) => {
        const response =  await createApiClient().get('/staff', {params: payload})
        return response
    },
    getStaff : async (id: string) => {
        const response =  await createApiClient().get(`/staff/${id}`)
        return response
    },
    staffCount : async () => {
        const response =  await createApiClient().get('/staff/countAll')
        return response.data
    },
    createStaff : async (payload: any) => {
        const response =  await createApiClient().post('/staff', payload)
        return response
    },
    updateStaff : async (id: string, payload: any) => {
        const response =  await createApiClient().patch(`/staff/${id}`, payload)
        return response
    },
    deleteStaff : async (id: string) => {
        const response =  await createApiClient().delete(`/staff/${id}`)
        return response
    },
}