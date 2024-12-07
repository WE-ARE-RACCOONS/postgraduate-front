'use client';
import dynamic from 'next/dynamic';
const STabBar = dynamic(
  () => import('@/components/Bar/TapBar/SeniorTab/STabBar'),
  {
    ssr: false,
  },
);

import React, { useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import LogoLayer from '@/components/comon/LogoLayer/LogoLayer';
import MenuBar from '@/components/Bar/MenuBar';
import SearchModal from '@/components/Modal/SearchModal';
import { overlay } from 'overlay-kit';

function SeniorMentoringPage() {
  const { getAccessToken } = useAuth();
  const openSearchModal = () => {
    overlay.open(({ unmount }) => <SearchModal modalHandler={unmount} />);
  };

  useEffect(() => {
    getAccessToken().then((tkn) => {
      if (!tkn) {
        // 알림톡으로 들어와서 토큰 없을 시, 로그인으로 이동
        const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
        const REDIRECT_URI =
          window.location.origin + '/login/oauth2/code/kakao';
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
        return;
      }
    });
  }, []);

  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      <LogoLayer modalHandler={openSearchModal} />
      <STabBar />
      <MenuBarWrapper>
        <MenuBar modalHandler={openSearchModal} />
      </MenuBarWrapper>
    </div>
  );
}

const MenuBarWrapper = styled.div`
  position: fixed;
  width: inherit;
  bottom: 0;
  z-index: 1;
`;

export default SeniorMentoringPage;
