import instance from '@/api/api';
import { KakaoAuthFetchResponse } from '@/api/auth/login/kakaoAuthFetch';

interface RejoinFetchRequest {
  socialId: string;
  rejoin: boolean;
}

export const rejoinPatchFetch = async ({
  socialId,
  rejoin,
}: RejoinFetchRequest) => {
  return await instance.patch<KakaoAuthFetchResponse>('/auth/rejoin/KAKAO', {
    socialId,
    rejoin,
  });
};
