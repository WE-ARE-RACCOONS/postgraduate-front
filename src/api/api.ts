import useAuth from '@/hooks/useAuth';
import findExCode from '@/utils/findExCode';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { sendServerErrorMsgToSlack } from './slack/sendSeverError';
import { captureException } from '@sentry/nextjs';

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
    if (accessTkn) {
      config.headers.Authorization = `Bearer ${accessTkn}`;
    }

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
      captureException(res.data.code, {
        level: 'error',
        extra: {
          header: res.config.headers,
          request: res.request,
          type: 'Network Error!',
        },
      });
      removeTokens();
      alert(res.data.message);
      sendServerErrorMsgToSlack(res);

      if (typeof window !== 'undefined') {
        window.location.reload();
      }

      throw new Error(`에러메시지 : ${res.data.message}`);
    }
    return res;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  },
);

withOutAuthInstance.interceptors.response.use(
  (res) => {
    if (findExCode(res.data.code)) {
      sendServerErrorMsgToSlack(res);
    }

    return res;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  },
);
export { withAuthInstance, withOutAuthInstance };
