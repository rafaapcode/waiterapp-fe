import { useGetToken } from "@/hooks/useToken";
import axios from "axios";

export const uploadImage = axios.create({
  baseURL: import.meta.env.VITE_UPLOAD_IMAGE_LAMBDA
})

export const analyseImage = axios.create({
  baseURL: import.meta.env.VITE_ANALYSE_IMAGE_LAMBDA
})

export const apiclient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

apiclient.interceptors.request.use(
  (config) => {
    const token = useGetToken();
    if(token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    };

    return config;
  },
);
