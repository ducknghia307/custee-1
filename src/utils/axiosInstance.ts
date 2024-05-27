import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import axios from "axios";

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

// Function to set Authorization token
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    console.log("Request headers before request:", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login" // Add condition to check the login endpoint
    ) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.get("auth/refresh");
        const newAccessToken = response.data.accessToken;
        setAuthToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        console.log("Refresh successful");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
