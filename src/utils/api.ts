import axios from "axios";
import { Config } from "../utils/config";
import { AuthActions, useAuth } from "../zustand/auth.store";

export const createApiClient = (auth = true) => {
  const http = axios.create({
    baseURL: Config.apiBaseUrl,

  });

  http.interceptors.request.use(
    function (config: any) {
      const token: any = useAuth.getState().token;
      

      if (token) {
        config.headers = {
          ...config.headers, Authorization: `Bearer ${token}`,
        };

        // config.headers = {...config.headers, 'content-Type':'application/x-www-form-urlencoded'}
      }
      console.log(config.headers, token);
      // console.log(config);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (request) => {
      return request;
    },
    (err) => {
      if (err.response) {
        if (
          err.response.data &&
          err.response.data.message === "jwt expired"
        ) {
          AuthActions.logout();
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );

  return http;
};
