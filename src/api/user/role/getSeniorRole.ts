import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface GetSeniorRoleResponse extends ResponseModel {
  data: {
    possible: boolean;
    socialId: number;
  };
}

export const getSeniorRole = async () => {
  try {
    return (
      await withAuthInstance.get<GetSeniorRoleResponse>('/senior/me/role')
    ).data;
  } catch (e) {
    throw e;
  }
};
