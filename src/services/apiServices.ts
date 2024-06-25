import { decryptAccessToken, encryptAccessToken } from "@/helper/Helper";
import axios, { AxiosInstance } from "axios";

export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  try {
    const accessToken = decryptAccessToken(
      localStorage.getItem("accessToken") || ""
    );
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const newAccessToken: string = response.data.data.accessToken;
    const encryptedAccessToken: string = encryptAccessToken(newAccessToken);
    localStorage.setItem("accessToken", encryptedAccessToken);

    return newAccessToken;
  } catch (error: any) {
    localStorage.clear();
    window.location.href = "/login";
  }
};

myAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const byPassUrls = [
      "/auth/sign-in",
      "/auth/refresh-token",
      "/auth/google",
      "/auth/sign-up",
      "/password-reset/forgot-password",
      "/password-reset/verify-otp",
      "/password-reset/reset-password",
      "/auth//verify-email",
    ];

    if (byPassUrls.includes(error.config.url)) {
      throw error;
    }

    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return myAxios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

myAxios.interceptors.request.use((config) => {
  const accessToken = decryptAccessToken(
    localStorage.getItem("accessToken") || ""
  );
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { myAxios };
