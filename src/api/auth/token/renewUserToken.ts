import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface ReNewUserTokenResponse extends ResponseModel {
  data: {
    accessToken: string;
    accessExpiration: number;
    refreshToken: string;
    refreshExpiration: number;
    role: 'ADMIN' | 'USER' | 'SENIOR';
    isTutorial: true;
  };
}

export const renewUserToken = async () => {
  try {
    return (
      await withAuthInstance.post<ReNewUserTokenResponse>(
        '/auth/user/token',
        {},
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
