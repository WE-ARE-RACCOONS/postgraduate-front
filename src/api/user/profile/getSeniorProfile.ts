import instance from '@/api/api';
import { ResponseModel } from '@/api/model';

interface SeniorProfileFetchResponse extends ResponseModel {
  data: {
    lab: string;
    keyword: string[];
    info: string;
    target: string;
    chatLink: string;
    field: string[];
    oneLiner: string;
    times: Time[];
  };
}

interface Time {
  day: string;
  startTime: string;
  endTime: string;
}

export const seniorProfileFetch = async () => {
  return await instance.get<SeniorProfileFetchResponse>('/senior/me/profile');
};
