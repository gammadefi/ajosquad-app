import { createApiClient } from "../utils/api"
import { authApiRoutes } from "./routes"

export const authServices = {
  login: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.login, payload);
    return response.data;
  },
  signUp: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.signUp, payload);
    return response.data;
  },
  refreshToken: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.refreshToken, payload);
    return response.data;
  },
  verifyOtp: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.verifyOtp, payload);
    return response.data;
  },
  forgotPassword: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.forgotPassword, payload);
    return response.data;
  },
  resetPassword: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.resetPassword, payload);
    return response.data;
  },
  sendOtp: async (payload: any) => {
    const response = await createApiClient().post(authApiRoutes.sendOtp, payload);
    return response.data;
  }
}