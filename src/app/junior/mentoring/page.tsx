'use client';
import TapBar from '@/components/Bar/TapBar/JuniorTab/JTabBar';
import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import DimmedModal from '@/components/Modal/DimmedModal';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import Image from 'next/image';
import styled from 'styled-components';
import Login from '@/components/kakao/login';
import search from '../../../../public/search.png';
import logo from '../../../../public/logo.png';
import MenuBar from '@/components/Bar/MenuBar';
function JuniorMentoringPage() {
  const {
    modal: searchModal,
    modalHandler: searchModalHandler,
    portalElement: searchPortalElement,
  } = useModal('search-portal');
  return (
    <div style={{width:'inherit',
    height: 'inherit'}}>
      <HomeTopLayer>
        <Logo>
          <Image
            id="logo"
            src={logo}
            alt="로고"
            width={36}
            height={24}
            priority
            onClick={searchModalHandler}
            style={{ marginRight: '0.13rem' }}
          />
          <div className="none-name">대학원</div>
          <div className="bold-name">김선배</div>
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            id="search"
            src={search}
            alt="검색"
            sizes="(max-width: 600px) 2.rem"
            priority
            onClick={searchModalHandler}
          />
          <Login />
        </div>
      </HomeTopLayer>
      <TapBar />
      <MenuBarWrapper>
        <MenuBar />
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
const HomeTopLayer = styled.div`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;
const Logo = styled.div`
  display: flex;
  .none-name {
    font-size: 1.3rem;
  }
  .bold-name {
    font-size: 1.3rem;
    font-weight: 700;
  }
`;

export default JuniorMentoringPage;
