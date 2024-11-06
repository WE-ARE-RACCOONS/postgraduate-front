import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface GetUserRoleResponse extends ResponseModel {
  data: {
    possible: boolean;
    socialId: number;
  };
}

export const getUserRole = async () => {
  try {
    return (await withAuthInstance.get<GetUserRoleResponse>('/user/me/role'))
      .data;
  } catch (e) {
    throw e;
  }
};
