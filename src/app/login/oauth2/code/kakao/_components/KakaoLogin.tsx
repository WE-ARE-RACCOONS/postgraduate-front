'use client';

import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import styled from 'styled-components';
import { signIn } from 'next-auth/react';

const KakaoLogin = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await signIn('kakao', {
          callbackUrl: '/signup/select',
          redirect: true,
        });
      } catch (error) {
        console.error(error);
      }
    })();
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
};

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

export default KakaoLogin;
