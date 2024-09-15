import instance from '@/api/api';
import { ResponseModel } from '@/api/model';

interface ChangeUserInfoFetchResponse extends ResponseModel {
  data: {};
}

interface ChangeUserInfoFetchRequest {
  profile: string;
  nickName: string;
  phoneNumber?: string;
}

export const changeUserInfo = async ({}: ChangeUserInfoFetchRequest) => {
  return await instance.patch<ChangeUserInfoFetchResponse>('/user/me/info');
};
