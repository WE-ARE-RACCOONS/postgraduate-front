import { withOutAuthInstance } from '@/api/api';

import { ResponseModel } from '@/api/model';

export interface KakaoAuthFetchResponse extends ResponseModel {
  data: {
    accessToken: string;
    accessExpiration: number;
    refreshToken: string;
    role: 'USER' | 'ADMIN' | 'SENIOR';
    isTutorial: boolean;
    refreshExpiration: number;
    socialId: string;
    isDelete: boolean;
  };
}

export const kakaoAuthFetch = async ({ code }: { code: string }) => {
  return await withOutAuthInstance.post<KakaoAuthFetchResponse>(
    window.location.hostname.includes('localhost')
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/dev/login/KAKAO`
      : `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/KAKAO`,
    {
      code: code,
    },
  );
};
