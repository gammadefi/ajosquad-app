import { createApiClient } from "../utils/api"
import { statisticsApiRoutes } from "./routes"

export const statisticsServices = {
  getUserStatDashboard: async() => {
    const response = await createApiClient().get(statisticsApiRoutes.getUserStatDashboard);
    return response.data;
  }
}