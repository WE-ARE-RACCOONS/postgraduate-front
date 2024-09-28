import { apiFetch } from '@/api/common';
import { ResponseModel } from '@/api/model';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

export interface SeniorInfoPatchFetchParams {
  isNext: boolean;
  /**
   * 연구실 명
   */
  lab: string;

  /**
   * 연구주제 해시태그
   */
  keyword: string;

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
  field: string;

  /**
   * 한줄 소개
   */
  oneLiner: string;

  /**
   * 시간
   */
  times: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface SeniorInfoResponse extends ResponseModel {}

export const seniorInfoPatchFetch = async (
  params: SeniorInfoPatchFetchParams,
) => {
  const session = await getSession();

  const { isNext, ...rest } = params;

  if (session) {
    if (isNext) {
      return fetch('/api/senior/me/profile', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        method: 'PATCH',
        body: JSON.stringify(rest),
      });
    }
  }

  const serverSession = await getServerSession(authOptions);

  if (serverSession) {
    return fetch(`${process.env.SERVER_URL}/senior/me/profile`, {
      headers: {
        Authorization: `Bearer ${serverSession.accessToken}`,
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(rest),
    });
  }
};
