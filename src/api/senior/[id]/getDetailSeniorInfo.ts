import { ResponseModel } from '@/api/model';
import { withAuthInstance, withOutAuthInstance } from '@/api/api';

interface SeniorInfoRequest {
  seniorId: string;
}
export interface SeniorInfoResponse extends ResponseModel {
  data: {
    isMine: boolean;
    certification: boolean;
    nickName: string;
    term: number;
    target: string;
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
  if (typeof window !== 'undefined' && window.localStorage) {
    return (
      await withAuthInstance.get<SeniorInfoResponse>(`/senior/${seniorId}`)
    ).data.data;
  }
  return (
    await withOutAuthInstance.get<SeniorInfoResponse>(`/senior/${seniorId}`)
  ).data.data;
};
