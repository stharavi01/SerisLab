import axios from "axios";
import { apiErrorHandler } from "../utils/error-handler";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.serislab.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Error handling
    if (error.response?.data && Object.keys(error.response.data).length > 0) {
      const userFriendlyMessage = apiErrorHandler.getErrorMessage(
        error.response.data,
      );
      error.userMessage = userFriendlyMessage;

      if (process.env.NODE_ENV === "development") {
        console.error("API Error:", {
          url: error.config?.url,
          data: error.response.data,
          userMessage: userFriendlyMessage,
        });
      }
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
