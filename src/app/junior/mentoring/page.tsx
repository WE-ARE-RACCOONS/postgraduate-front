'use client';

import dynamic from 'next/dynamic';
const TabBar = dynamic(
  () => import('@/components/Bar/TapBar/JuniorTab/JTabBar'),
  {
    ssr: false,
  },
);
import React, { useEffect } from 'react';
import styled from 'styled-components';
import MenuBar from '@/components/Bar/MenuBar';
import LogoLayer from '@/components/comon/LogoLayer/LogoLayer';
import SearchModal from '@/components/Modal/SearchModal';
import { overlay } from 'overlay-kit';
import useAuth from '@/hooks/useAuth';

function JuniorMentoringPage() {
  const { getAccessToken } = useAuth();

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

  const openSearchModal = () => {
    overlay.open(({ unmount }) => <SearchModal modalHandler={unmount} />);
  };

  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      <LogoLayer modalHandler={openSearchModal} />
      <TabBar />
      <MenuBarWrapper>
        <MenuBar modalHandler={openSearchModal} />
      </MenuBarWrapper>
    </div>
  );
}

const MenuBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: inherit;
  z-index: 1;
`;

export default JuniorMentoringPage;
