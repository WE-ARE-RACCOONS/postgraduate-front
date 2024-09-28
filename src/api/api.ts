import useAuth from '@/hooks/useAuth';
import findExCode from '@/utils/findExCode';
import axios, { InternalAxiosRequestConfig } from 'axios';

const withAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const withOutAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});
withAuthInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const { getAccessToken } = useAuth();
    const accessTkn = await getAccessToken();

    config.headers.Authorization = `Bearer ${accessTkn}`;

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

withAuthInstance.interceptors.response.use(
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

export { withAuthInstance, withOutAuthInstance };
