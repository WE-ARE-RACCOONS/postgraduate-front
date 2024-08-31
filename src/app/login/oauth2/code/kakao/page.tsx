'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useSetAtom } from 'jotai';
import { socialIdAtom, isTutorialFinished } from '@/stores/signup';
import Spinner from '@/components/Spinner';
import styled from 'styled-components';
import { kakaoAuthFetch } from '@/api/auth/login/kakaoAuthFetch';
import { overlay } from 'overlay-kit';
import FullModal from '@/components/Modal/FullModal';

function KakaoPage() {
  const setSocialId = useSetAtom(socialIdAtom);
  const setTutorialFinished = useSetAtom(isTutorialFinished);
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const fetchKakaoData = async () => {
      try {
        const { data: kakaoAuthFetchRes } = await kakaoAuthFetch({
          code: code ?? '',
        });

        const {
          accessExpiration,
          accessToken,
          refreshToken,
          role,
          isTutorial,
          refreshExpiration,
          socialId,
          isDelete,
        } = kakaoAuthFetchRes.data;

        if (kakaoAuthFetchRes.code === 'AU204') {
          setAccessToken({
            token: accessToken,
            expires: accessExpiration,
          });
          setRefreshToken({
            token: refreshToken,
            expires: refreshExpiration,
          });
          setUserType(role);
          setTutorialFinished(isTutorial);
          router.replace('/');
          return;
          //재가입 여부 입력 받을 때까지 지연
        }

        setSocialId(socialId);
        localStorage.setItem('socialId', socialId);
        if (isDelete) {
          overlay.open(({}) => {
            return (
              <FullModal modalType="account-reactive" modalHandler={() => {}} />
            );
          });
        }

        alert(kakaoAuthFetchRes.data.isDelete);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKakaoData();
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
