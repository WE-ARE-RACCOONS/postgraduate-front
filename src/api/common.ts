import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import returnFetch, { FetchArgs } from 'return-fetch';

interface CreateApiFetchParamsType {
  getSession: () => Promise<any>;
}

const createApiFetch = ({ getSession }: CreateApiFetchParamsType) => {
  return async <T>(
    input: URL | RequestInfo,
    init?: RequestInit,
  ): Promise<{ data: T; status: number }> => {
    return returnFetch({
      baseUrl: process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      interceptors: {
        request: async (config: FetchArgs) => {
          const session = await getSession();

          if (session) {
            if (!config[1]) {
              config[1] = {};
            }
            if (!config[1].headers) {
              config[1].headers = {};
            }

            // Headers 객체를 변환하여 Authorization 헤더 추가
            const headers = new Headers(config[1].headers);
            headers.set('Authorization', `Bearer ${session.accessToken}`);
            config[1].headers = Object.fromEntries(headers.entries());
          }

          return config;
        },

        response: async (response: Response) => {
          const responseBody = await response.json();

          return new Response(JSON.stringify(responseBody), {
            status: response.status,
          });
        },
      },
    })(input, init).then((response) =>
      response.json().then((data: T) => ({
        data,
        status: response.status,
      })),
    );
  };
};

// 클라이언트 사이드용 함수
export const clientApiFetch = createApiFetch({
  getSession: async () => {
    const session = await getSession();

    return Promise.resolve(session);
  },
});

// 서버 사이드용 함수
export const serverApiFetch = createApiFetch({
  getSession: async () => await getServerSession(authOptions),
});

// 환경에 따라 적절한 함수를 선택하는 래퍼 함수
export const apiFetch = <T>(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<{ data: T; status: number }> => {
  if (typeof window !== 'undefined') {
    return clientApiFetch<T>(input, init);
  } else {
    return serverApiFetch<T>(input, init);
  }
};
