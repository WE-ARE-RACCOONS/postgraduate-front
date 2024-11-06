import { withAuthInstance } from '@/api/api';
import { ResponseModel } from '@/api/model';

interface CommonMyInfoResponse {
  nickName: string;
  profile: string;
}

interface JuniorMyInfoResponse extends ResponseModel {
  data: CommonMyInfoResponse;
}

interface SeniorMyInfoResponse extends ResponseModel {
  data: CommonMyInfoResponse & {
    socialId: number;
    seniorId: number;
    certificationRegister: 'NOT_APPROVE' | 'WAITING' | 'NONE' | 'APPROVE';
    profileRegister: boolean;
  };
}

type MyInfoResponse = JuniorMyInfoResponse & SeniorMyInfoResponse;

export const getMyInfo = async ({ isJunior }: { isJunior: boolean }) => {
  const endpoint = isJunior ? '/user/me' : '/senior/me';
  const response = await withAuthInstance.get<MyInfoResponse>(endpoint);
  return response.data.data;
};
