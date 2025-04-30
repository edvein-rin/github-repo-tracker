import axios from "axios";

import { getToken, removeToken } from "../auth";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      removeToken();
    }
    return Promise.reject(error);
  }
);
