'use client';
import React from 'react';
import { TapStyle } from '../FieldTapBar/FieldTapBar.styled';
import { smtapType } from '@/types/tap/tap';
import { suactiveTabAtom } from '@/stores/tap';
import { useAtom } from 'jotai';
function UnivTapBar() {
  const [fuActiveTab, setFuActiveTab] = useAtom(suactiveTabAtom);
  const handleTabClick = (tabIndex: smtapType) => {
    setFuActiveTab(tabIndex);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick('ALL')}>전체선택</TapStyle>
        <TapStyle onClick={() => handleTabClick('SEO')}>서울대</TapStyle>
        <TapStyle onClick={() => handleTabClick('YEO')}>연세대</TapStyle>
        <TapStyle onClick={() => handleTabClick('OT')}>다른학교</TapStyle>
      </div>
    </div>
  );
}

export default UnivTapBar;
