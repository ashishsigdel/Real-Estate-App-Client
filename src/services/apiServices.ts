import axios, { AxiosInstance } from "axios";

export const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export { myAxios };
