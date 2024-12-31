import { withOutAuthInstance } from '@/api/api';
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
  const accessToken = await getAccessToken();

  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  return await withOutAuthInstance.get<UserInfoFetchResponse>('/user/me/info', {
    headers,
  });
};
