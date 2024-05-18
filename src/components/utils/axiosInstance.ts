import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // The token will be added to the config before each request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
