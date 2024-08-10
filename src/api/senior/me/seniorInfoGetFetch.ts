import { clientFetch } from '@/api/common';
import { ResponseModel } from '@/api/model';

export interface SeniorInfoResponse extends ResponseModel {
  data: {
    /**
     * 연구실 명
     */
    lab: string;

    /**
     * 연구주제 해시태그
     */
    keyword: string[];

    /**
     * 한줄 소개
     */
    info: string;

    /**
     * 추천대상
     */
    target: string;

    /**
     * 오픈챗 링크
     */
    chatLink: string;

    /**
     * 연구분야 해시태그
     */
    field: string[];

    /**
     * 한줄 소개
     */
    outLinter: string;

    /**
     * 가능 정기일정
     */
    times: {
      day: string;
      startTime: string;
      endTime: string;
    }[];
  };
}

export const seniorInfoGetFetch = () =>
  clientFetch.get<SeniorInfoResponse>('/senior/me/profile');
