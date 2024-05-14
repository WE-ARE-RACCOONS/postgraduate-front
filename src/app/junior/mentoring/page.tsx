'use client';
import TapBar from '@/components/Bar/TapBar/JuniorTab/JTabBar';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import styled from 'styled-components';
import MenuBar from '@/components/Bar/MenuBar';
import LogoLayer from '@/components/LogoLayer/LogoLayer';
import SearchModal from '@/components/Modal/SearchModal';
import useAuth from '@/hooks/useAuth';

function JuniorMentoringPage() {
  const {
    modal: searchModal,
    modalHandler: searchModalHandler,
    portalElement: searchPortalElement,
  } = useModal('search-portal');
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

  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      <LogoLayer modalHandler={searchModalHandler} />
      <TapBar />
      <MenuBarWrapper>
        <MenuBar modalHandler={searchModalHandler} />
      </MenuBarWrapper>
      {searchModal && searchPortalElement
        ? createPortal(
            <SearchModal modalHandler={searchModalHandler} />,
            searchPortalElement,
          )
        : ''}
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
