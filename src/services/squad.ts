import { createApiClient } from "../utils/api"
import { paramsObjectToQueryString } from "../utils/helpers";
import { squadApiRoutes } from "./routes"

export const squadServices = {
  getAllSquads: async (payload:any) => {
    const response = await createApiClient().get(squadApiRoutes.getAllSquads + paramsObjectToQueryString(payload));
    return response.data;
  },
  getSquad: async (id: string) => {
    const response = await createApiClient().get(squadApiRoutes.getSquad(id));
    return response.data;
  },

  getUserSquad: async (id: string) => {
    const response = await createApiClient().get(squadApiRoutes.getUserSquads(id));
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
    const response = await createApiClient().patch(squadApiRoutes.addNewSquadPosition(id), payload);
    return response.data;
  } ,

  connectBank: async (payload:any) => {
    const response = await createApiClient().post(squadApiRoutes.connectBank, payload);
    return response.data;
  },

  getSquadStats: async () => {
    const response = await createApiClient().get(squadApiRoutes.getSquadStats);
    return response.data;
  },

  getSquadStatsByStatus: async (status : any) => {
    const response = await createApiClient().get(squadApiRoutes.getSquadStatsByStatus(status));
    return response.data;
  },
    
  getSquadMembers: async (payload:any) => {
    const response = await createApiClient().get(squadApiRoutes.getSquadMembers + paramsObjectToQueryString(payload));
    return response.data
  }
}