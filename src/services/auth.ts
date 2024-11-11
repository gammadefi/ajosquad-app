import { createApiClient } from "../utils/api"
import { apiRoutes } from "./routes"

export const authServices = {
  login: async (payload: any) => {
    const response = await createApiClient().post(apiRoutes.login, payload);
    return response.data;
  },
  signUp: async (payload: any) => {
    const response = await createApiClient().post(apiRoutes.signUp, payload);
    return response.data;
  },
  refreshToken: async (payload: any) => {
    const response = await createApiClient().post(apiRoutes.refreshToken, payload);
    return response.data;
  },
  verifyOtp: async (payload: any) => {
    const response = await createApiClient().post(apiRoutes.verifyOtp, payload);
    return response.data;
  },
  forgotPassword: async (payload: any) => {
    const response = await createApiClient().post(apiRoutes.forgotPassword, payload);
    return response.data;
  },
  resetPassword: async (payload: any) => {
    const response = await createApiClient().post(apiRoutes.resetPassword, payload);
    return response.data;
  },
  sendOtp: async (payload: any) => {
    const response = await createApiClient().post(apiRoutes.sendOtp, payload);
    return response.data;
  }
}