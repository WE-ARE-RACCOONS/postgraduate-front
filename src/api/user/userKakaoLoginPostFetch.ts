import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface UserKakaoLoginPostFetchParams {
  code: string;
}

export interface UserKakaoLoginResponse extends ResponseModel {
  accessToken: string;
  refreshToken: string;
}

export const userKakaoLoginPostFetch = (
  params: UserKakaoLoginPostFetchParams,
) =>
  apiFetch<UserKakaoLoginResponse>('/auth/dev/login/KAKAO', {
    method: 'POST',
    body: JSON.stringify(params),
  });
