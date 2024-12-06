import { ResponseModel } from '../model';
import { withOutAuthInstance } from '../api';
import findExCode from '@/utils/findExCode';

interface SeinorSignupRequest {
  socialId: number;
  phoneNumber: string;
  nickName: string;
  marketingReceive: boolean;
  major: string;
  postgradu: string;
  professor: string;
  lab: string;
  field: string;
  keyword: string;
  chatLink: string;
}

interface SeniorSignupResponse extends ResponseModel {
  data: {
    accessToken: string;
    accessExpiration: number;
    refreshToken: string;
    refreshExpiration: number;
    role: 'ADMIN' | 'USER' | 'SENIOR';
    isTutorial: boolean;
  };
}

export const seniorSignup = async ({
  socialId,
  ...rest
}: SeinorSignupRequest) => {
  try {
    const response = (
      await withOutAuthInstance.post<SeniorSignupResponse>(
        '/auth/senior/signup',
        {
          socialId,
          ...rest,
        },
      )
    ).data;
    if (findExCode(response.code)) {
      throw new Error(response.message);
    }
    return response.data;
  } catch (e) {
    throw e;
  }
};
