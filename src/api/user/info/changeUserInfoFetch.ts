import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface ChangeUserInfoFetchResponse extends ResponseModel {
  data: {};
}

interface ChangeUserInfoFetchRequest {
  profile: string;
  nickName: string;
  phoneNumber?: string;
}

export const changeUserInfo = async ({
  profile,
  nickName,
  phoneNumber,
}: ChangeUserInfoFetchRequest) => {
  return await withAuthInstance.patch<ChangeUserInfoFetchResponse>(
    '/user/me/info',
    {
      profile,
      nickName,
      phoneNumber,
    },
  );
};
