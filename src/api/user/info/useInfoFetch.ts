import { withAuthInstance, withOutAuthInstance } from '@/api/api';
import useAuth from '@/hooks/useAuth';

import { ResponseModel } from '@/api/model';

interface UserInfoFetchResponse extends ResponseModel {
  data: {
    nickName: string;
    profile: string;
    phoneNumber: string;
  };
}

export const userInfoFetch = async () => {
  const { getAccessToken } = useAuth();
  const isAuthorized = await getAccessToken();

  if (!isAuthorized) {
    return await withOutAuthInstance.get<UserInfoFetchResponse>(
      '/user/me/info',
    );
  } else {
    return await withAuthInstance.get<UserInfoFetchResponse>('/user/me/info');
  }
};
