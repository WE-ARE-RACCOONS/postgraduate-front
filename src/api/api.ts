import useAuth from '@/hooks/useAuth';
import findExCode from '@/utils/findExCode';
import axios, { InternalAxiosRequestConfig } from 'axios';

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
      removeTokens();
      window.location.href = '/';
      return Promise.reject(new Error('Access token is missing')); // 에러 반환
    } else {
      config.headers.Authorization = `Bearer ${accessTkn}`;
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    const { removeTokens } = useAuth();
    if (findExCode(res.data.code)) {
      removeTokens();
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
    return res;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  },
);

export default instance;
