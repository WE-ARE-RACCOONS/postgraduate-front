'use client';
import React from 'react';
import { TapStyle } from '../FieldTapBar/FieldTapBar.styled';
import { smtapType } from '@/types/tap/tap';
import { suactiveTabAtom } from '@/stores/tap';
import { useAtom } from 'jotai';
import { SMTAB } from '@/constants/tab/ctap';
function UnivTapBar() {
  const [fuActiveTab, setFuActiveTab] = useAtom(suactiveTabAtom);
  const handleTabClick = (tabIndex: smtapType) => {
    setFuActiveTab(tabIndex);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick(SMTAB.ALL)}>전체선택</TapStyle>
        <TapStyle onClick={() => handleTabClick(SMTAB.SEO)}>서울대</TapStyle>
        <TapStyle onClick={() => handleTabClick(SMTAB.YEO)}>연세대</TapStyle>
        <TapStyle onClick={() => handleTabClick(SMTAB.OT)}>다른학교</TapStyle>
      </div>
    </div>
  );
}

export default UnivTapBar;
