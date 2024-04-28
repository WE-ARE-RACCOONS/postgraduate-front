'use client';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { useSetAtom } from 'jotai';
import { socialIdAtom } from '@/stores/signup';
import Spinner from '@/components/Spinner';
import styled from 'styled-components';

function KakaoPage() {
  const setSocialId = useSetAtom(socialIdAtom);
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    axios
      .post(
        window.location.hostname.includes('localhost')
          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/dev/login/KAKAO`
          : `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/KAKAO/b`,
        {
          code: code,
        },
      )
      .then((res) => {
        const response = res.data;
        if (response.code == 'AU205') {
          setSocialId(response.data.socialId);
          if (typeof window !== undefined) {
            window.localStorage.setItem('socialId', response.data.socialId);
          }
          router.push('/signup/select');
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

        router.replace('/');
      })
      .catch((err) => {
        console.error(err);
        router.replace('/');
      });
  }, []);

  useEffect(() => {
    const loginTimeout = setTimeout(() => {
      router.replace('/');
    }, 15000);

    return () => clearTimeout(loginTimeout);
  }, []);

  return (
    <KakaoLoginPageContainer>
      <div id="login-ing-text">로그인 중입니다...</div>
      <div id="spinner-container">
        <Spinner />
      </div>
    </KakaoLoginPageContainer>
  );
}

const KakaoLoginPageContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;

  #login-ing-text {
    position: absolute;
    top: 3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  #spinner-container {
    position: absolute;
    top: 5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default KakaoPage;
