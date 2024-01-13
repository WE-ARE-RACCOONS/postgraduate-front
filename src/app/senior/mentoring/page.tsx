'use client';
import STapBar from '@/components/Bar/TapBar/SeniorTab/STabBar';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import DimmedModal from '@/components/Modal/DimmedModal';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import LogoLayer from '@/components/LogoLayer/LogoLayer';
import MenuBar from '@/components/Bar/MenuBar';
import SearchModal from '@/components/Modal/SearchModal';
function SeniorMentoringPage() {
  const {
    modal: searchModal,
    modalHandler: searchModalHandler,
    portalElement: searchPortalElement,
  } = useModal('search-portal');
  return (
    <div style={{ width: 'inherit', height: 'inherit' }}>
      <LogoLayer modalHandler={searchModalHandler} />
      <STapBar />
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
  width: inherit;
  bottom: 0;
  z-index: 1;
`;

export default SeniorMentoringPage;
