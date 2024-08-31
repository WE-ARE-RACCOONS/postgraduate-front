import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface KakaoAuthPostFetchParams {
  /**
   * 카카오 서버에서 발급받은 accessToken
   */
  accessToken: string;
}

export interface KakaoAuthResponse extends ResponseModel {
  data: {
    /**
     * 김선배 서버 accessToken
     */
    accessToken: string;

    /**
     * accessToken 만료시간
     */
    accessExpiration: number;

    /**
     * 김선배 서버 refreshToken
     */
    refreshToken: string;

    /**
     * refreshToken 만료시간
     */
    refreshExpiration: number;

    /**
     * 유저 유형
     */
    role: 'SENIOR' | string;

    /**
     * 초기 로그인일 시
     */
    socialId?: string;
  };
}

/**
 * next-auth kakao login < 백 서버로 요청 >
 */
export const kakaoAuthPostFetch = (params: KakaoAuthPostFetchParams) =>
  apiFetch<KakaoAuthResponse>('/auth/login/token/KAKAO', {
    method: 'POST',
    body: JSON.stringify(params),
  });
