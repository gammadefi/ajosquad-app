import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers";


export const NotificationService = {

    getNotifications: async (payload: any) => {
        const res = await createApiClient().get(`/notification${paramsObjectToQueryString(payload)}`);
    }
}