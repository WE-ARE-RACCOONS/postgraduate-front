import { withAuthInstance } from '@/api/api';

import { ResponseModel } from '@/api/model';

interface UserInfoFetchResponse extends ResponseModel {
  data: {
    nickName: string;
    profile: string;
    phoneNumber: string;
  };
}

export const userInfoFetch = async () => {
  return await withAuthInstance.get<UserInfoFetchResponse>('/user/me/info');
};
