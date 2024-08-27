import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

instance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const { getAccessToken, removeTokens } = useAuth();
    const accessTkn = await getAccessToken();

    if (!accessTkn && typeof window !== 'undefined') {
      // refresh token까지 만료된 경우
      removeTokens();
      window.location.href = '/';
    } else {
      config.headers.Authorization = `Bearer ${accessTkn}`;
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default instance;
