import axios from "axios";
import { getToken } from "../services/tokenService";

export const api = axios.create({
  // baseURL: "https://petconnectbackend-r2ldr42g.b4a.run/", // URL DA API
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    console.log("Inteceptor Token: " + token)
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 401) {
      //HANDLE UNAUTHORIZED ACCESS.
    }
    return Promise.reject(error);
  }
);
