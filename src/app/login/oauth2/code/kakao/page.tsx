'use client';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

function KakaoPage() {
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
        code: code,
      })
      .then((res) => {
        const response = res.data;

        if (response.code == 'AU205') {
          router.replace(`/signup/${response.data.socialId}`);
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
