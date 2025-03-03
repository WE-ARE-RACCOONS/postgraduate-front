import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface ChangeSeniorAccountResponse extends ResponseModel {
  data: {
    profile: string;
    phoneNumber: string;
    nickName: string;
    bank: string;
    accountNumber: string;
    accountHolder: string;
  };
}

export const changeSeniorAccont = async ({
  phoneNumber,
  profile,
  bank,
  nickName,
  accountHolder,
  accountNumber,
}: ChangeSeniorAccountResponse['data']) => {
  try {
    return await withAuthInstance.patch<ChangeSeniorAccountResponse>(
      '/senior/me/account',
      {
        phoneNumber,
        profile,
        bank,
        accountHolder,
        accountNumber,
        nickName,
      },
    );
  } catch (e) {
    throw e;
  }
};
