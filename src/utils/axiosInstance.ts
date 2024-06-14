import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import axios from "axios";

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});
const publicAxios = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});


// function getToken() {
//   // Step 1: Retrieve the JSON string from localStorage
//   const persistRootData = localStorage.getItem('persist:root');

//   if (persistRootData) {
//     // Step 2: Parse the outer JSON string to get the JavaScript object
//     const outerObject = JSON.parse(persistRootData);

//     // Step 3: Parse the nested JSON string inside the 'auth' property
//     const authObject = JSON.parse(outerObject.auth);

//     // Step 4: Extract the token from the nested object
//     return authObject.token;
//   }
//   return null;
// }


// Function to set Authorization token
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
publicAxios.interceptors.request.use(
  (config) => {
    // getToken();
    // if (!config.headers['Authorization']) {
    //   config.headers['Authorization'] = `Bearer ${getToken()}`;
    // }
    // console.log(config.headers);
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // getToken();
    // if (!config.headers['Authorization']) {
    //   config.headers['Authorization'] = `Bearer ${getToken()}`;
    // }
    // console.log(config.headers);
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
      !originalRequest._retry
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

// // React hook to update the token
// export const useAxiosAuthToken = () => {
//   const token = useAppSelector((state) => state.auth.token);

//   useEffect(() => {
//     setAuthToken(token);
//   }, [token]);
// };

export  {axiosInstance, publicAxios};
