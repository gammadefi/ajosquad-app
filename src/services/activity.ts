import { createApiClient } from "../utils/api"



export const ActivityService = {
    getActivities: async () => {
        const res = await createApiClient().get('/activity');
        return res.data
    }
}