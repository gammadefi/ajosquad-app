import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers";
import { statisticsApiRoutes } from "./routes"

export const statisticsServices = {
  getUserStatDashboard: async() => {
    const response = await createApiClient().get(statisticsApiRoutes.getUserStatDashboard);
    return response.data;
  },

  getTransactions: async(payload: any) => {
    const response = await createApiClient().get(`/statistics/transactions${paramsObjectToQueryString(payload)}`);
    return response;
  },
}