import instance from '@/api/api';

import { ResponseModel } from '@/api/model';

interface UserInfoFetchResponse extends ResponseModel {
  data: {
    nickName: string;
    profile: string;
  };
}

export const userInfoFetch = async () => {
  return await instance.get<UserInfoFetchResponse>('/user/me');
};
