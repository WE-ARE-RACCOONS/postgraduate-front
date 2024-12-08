'use client';

import React from 'react';
import styled from 'styled-components';
import Spinner from '@/components/common/Spinner';
import useKakaoLogin from '@/hooks/useKakaoLogin';

function KakaoPage() {
  useKakaoLogin();

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
