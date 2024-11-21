import { ResponseModel } from '../model';
import { withAuthInstance } from '../api';
interface UpdateRoleToJuniorResponse extends ResponseModel {
  data: {
    accessToken: string;
    accessExpiration: number;
    refreshToken: string;
    refreshExpiration: number;
    role: 'ADMIN' | 'USER' | 'SENIOR';
    isTutorial: boolean;
  };
}

export const updateRoleToJunior = async () => {
  try {
    return (
      await withAuthInstance.post<UpdateRoleToJuniorResponse>(
        '/auth/user/token',
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
