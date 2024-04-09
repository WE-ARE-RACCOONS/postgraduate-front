import useAuth from "@/hooks/useAuth";
import axios from "axios";
import type { InternalAxiosRequestConfig } from 'axios'
import { useRouter } from "next/navigation";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { getAccessToken, removeTokens } = useAuth();
    const accessTkn = getAccessToken();
    const router = useRouter();

    if(!accessTkn) { // refresh token까지 만료된 경우
      removeTokens();
      router.replace('/');
    } else {
      config.headers.Authorization = `Bearer ${accessTkn}`;
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
)