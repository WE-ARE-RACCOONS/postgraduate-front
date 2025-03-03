import { ResponseModel } from '@/api/model';
import { withAuthInstance } from '@/api/api';
import findExCode from '@/utils/findExCode';

interface SignUpUserRequest {
  socialId: number;
  phoneNumber: string;
  nickName: string;
  marketingReceive: boolean;
}

interface SignUpUserResponse extends ResponseModel {
  data: {
    accessToken: string;
    accessExpiration: number;
    refreshToken: string;
    refreshExpiration: number;
    role: 'ADMIN' | 'USER' | 'SENIOR';
    isTutorial: boolean;
  };
}

export const signupUser = async ({
  socialId,
  phoneNumber,
  nickName,
  marketingReceive,
}: SignUpUserRequest) => {
  const response = (
    await withAuthInstance.post<SignUpUserResponse>('/auth/user/signup', {
      socialId,
      phoneNumber,
      nickName,
      marketingReceive,
    })
  ).data;

  if (findExCode(response.code)) {
    throw new Error(response.message);
  }

  return response.data;
};
