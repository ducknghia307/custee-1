import axios from "axios";

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: "https://custeeserver.onrender.com",
  withCredentials: true,
});
const publicAxios = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const isBrowser = typeof document !== 'undefined';

// Function to save tokens as cookies
export const saveTokens = (accessToken, refreshToken) => {
  if (isBrowser) {
    document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
  }
};

// Function to set Authorization token
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const getTokenFromCookies = (tokenName) => {
  if (isBrowser) {
    const cookieArr = document.cookie.split(';');
    let token = null;
    cookieArr.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name === tokenName) {
        token = value;
      }
    });
    return token;
  }
  return null;
};

if (isBrowser) {
  setAuthToken(getTokenFromCookies('accessToken'));
}

publicAxios.interceptors.request.use(
  (config) => {
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
        const refreshToken = getTokenFromCookies('refreshToken');
        const response = await axiosInstance.post('/auth/refresh', {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });
        const newAccessToken = response.data.accessToken;
        if (isBrowser) {
          document.cookie = `accessToken=${newAccessToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
        }
        setAuthToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, publicAxios };
