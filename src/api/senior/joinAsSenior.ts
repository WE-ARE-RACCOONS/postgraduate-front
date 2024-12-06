import { ResponseModel } from '../model';
import { withAuthInstance } from '../api';
import findExCode from '@/utils/findExCode';

/** 선배로 추가 가입 */
interface JoinAsSeniorRequest {
  major: string;
  postgradu: string;
  professor: string;
  lab: string;
  field: string;
  keyword: string;
  chatLink: string;
}

interface JoinAsSeniorResponse extends ResponseModel {
  data: {
    accessToken: string;
    accessExpiration: number;
    refreshToken: string;
    refreshExpiration: number;
    role: 'ADMIN' | 'USER' | 'SENIOR';
    isTutorial: boolean;
  };
}

export const joinAsSenior = async ({ major, ...rest }: JoinAsSeniorRequest) => {
  try {
    const response = (
      await withAuthInstance.post<JoinAsSeniorResponse>('/auth/senior/change', {
        major,
        ...rest,
      })
    ).data;

    if (findExCode(response.code)) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (e) {
    throw e;
  }
};
