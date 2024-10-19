import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface ReNewSeniorTokenResponse extends ResponseModel {
  data: {
    accessToken: string;
    accessExpiration: number;
    refreshToken: string;
    refreshExpiration: number;
    role: 'ADMIN' | 'USER' | 'SENIOR';
    isTutorial: true;
  };
}

export const renewSeniorToken = async () => {
  try {
    return (
      await withAuthInstance.post<ReNewSeniorTokenResponse>(
        '/auth/senior/token',
        {},
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
