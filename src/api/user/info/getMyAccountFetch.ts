import { ResponseModel } from '@/api/model';

interface GetSeniorMyAccountResponse extends ResponseModel {
  data: {
    profile: string;
    phoneNumber: string;
    nickName: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
  };
}
import { withAuthInstance } from '@/api/api';
export const getSenoirMyAccount = async () => {
  try {
    return (
      await withAuthInstance.get<GetSeniorMyAccountResponse>(
        '/senior/me/account',
      )
    ).data;
  } catch (e) {
    throw e;
  }
};
