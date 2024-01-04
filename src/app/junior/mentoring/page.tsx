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
import LogoLayer from '@/components/LogoLayer/LogoLayer';
import SearchModal from '@/components/Modal/SearchModal';
function JuniorMentoringPage() {
  const {
    modal: searchModal,
    modalHandler: searchModalHandler,
    portalElement: searchPortalElement,
  } = useModal('search-portal');
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
