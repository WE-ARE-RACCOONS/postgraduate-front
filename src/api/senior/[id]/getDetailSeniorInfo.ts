import { ResponseModel } from '@/api/model';
import { withOutAuthInstance } from '@/api/api';

interface SeniorInfoRequest {
  seniorId: string;
}
interface SeniorInfoResponse extends ResponseModel {
  data: {
    isMine: boolean;
    certification: boolean;
    nickName: string;
    term: number;
    profile: string;
    postgradu: string;
    major: string;
    lab: string;
    professor: string;
    keyword: string[];
    info: string;
    oneLiner: string;
    times: TimeObj[];
  };
}

export interface TimeObj {
  day: string;
  startTime: string;
  endTime: string;
}

export const getDetailSeniorInfoFetch = async ({
  seniorId,
}: SeniorInfoRequest) => {
  return await withOutAuthInstance.get<SeniorInfoResponse>(
    `/senior/${seniorId}`,
  );
};