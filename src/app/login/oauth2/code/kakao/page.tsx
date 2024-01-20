'use client';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { useAtom, useSetAtom } from 'jotai';
import { socialIdAtom } from '@/stores/signup';

function KakaoPage() {
  const setSocialId = useSetAtom(socialIdAtom);
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/KAKAO`, {
        code: code,
      })
      .then((res) => {
        const response = res.data;
        if (response.code == 'AU205') {
          // router.replace(`/signup/${response.data.socialId}`);
          router.replace('signup/select');
          setSocialId(response.data.socialId);
          return;
        }

        if (response.code == 'AU204') {
          setAccessToken({
            token: response.data.accessToken,
            expires: response.data.accessExpiration,
          });
          setRefreshToken({
            token: response.data.refreshToken,
            expires: response.data.refreshExpiration,
          });
          setUserType(response.data.role);

          router.replace('/');
          return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <div>로그인 중입니다.</div>;
}

export default KakaoPage;
