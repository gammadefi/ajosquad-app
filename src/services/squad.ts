import { createApiClient } from "../utils/api"
import { squadApiRoutes } from "./routes"

export const sqaudServices = {
  getAllSquads: async () => {
    const response = await createApiClient().get(squadApiRoutes.getAllSquads);
    return response.data;
  },
  getSquad: async (id: string) => {
    const response = await createApiClient().get(squadApiRoutes.getSquad(id));
    return response.data;
  },
  createSquad: async (payload: any) => {
    const response = await createApiClient().post(squadApiRoutes.createSquad, payload);
    return response.data;
  },
  joinSquad: async (id: string, payload: any) => {
    const response = await createApiClient().post(squadApiRoutes.joinSquad(id), payload);
    return response.data;
  },
  addNewSquadPosition: async (id: string, payload: any) => {
    const response = await createApiClient().post(squadApiRoutes.addNewSquadPosition(id), payload);
    return response.data;
  } 
}