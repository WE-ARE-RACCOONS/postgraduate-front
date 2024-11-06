import { KakaoAuthFetchResponse } from '@/api/auth/login/kakaoAuthFetch';
import axios from 'axios';

interface RejoinFetchRequest {
  socialId: string;
  rejoin: boolean;
}

export const rejoinPatchFetch = async ({
  socialId,
  rejoin,
}: RejoinFetchRequest) => {
  return await axios.patch<KakaoAuthFetchResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/rejoin/KAKAO`,
    {
      socialId,
      rejoin,
    },
  );
};
