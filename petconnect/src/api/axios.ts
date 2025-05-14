import axios from "axios";
import { Platform } from "react-native";
import { getToken } from "../services/tokenService";

let baseURL = "";

if (Platform.OS === "android") {
  baseURL = "http://10.0.2.2:8080/";
} else if (Platform.OS === "ios") {
  baseURL = "http://localhost:8080/";
} else {
  // Web
  baseURL = "http://localhost:8080/";
}

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    console.log("Interceptor Token: " + token);
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Request URL: ", config.url);
    console.log("Request Method: ", config.method);
    console.log("Request Headers: ", config.headers);

    return config;
  },
  (error) => {
    console.log("Request error: ", error);
    if (error.response) {
      console.log("Response error: ", error.response.data);
      console.log("Response status: ", error.response.status);
      console.log("Response headers: ", error.response.headers);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status == 401) {
      console.log("Unauthorized access - 401 error");
      // await clearToken(); // Clear the token from storage
      // navigation.navigate("Login"); // Redirect to the login screen
      //HANDLE UNAUTHORIZED ACCESS.
    }
    return Promise.reject(error);
  }
);
