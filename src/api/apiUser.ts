import axiosInstance from "../utils/axiosInstance";

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get("/api/user");
    return response.data.metadata;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};