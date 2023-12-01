'use client';
import React from 'react';
import { TapStyle } from './FieldTapBar.styled';
import { sftapType } from '@/types/tap/tap';
import { sfactiveTabAtom } from '@/stores/tap';
import { useAtom } from 'jotai';
function FieldTapBar() {
  const [fpActiveTab, setFpActiveTab] = useAtom(sfactiveTabAtom);
  const handleTabClick = (tabIndex: sftapType) => {
    setFpActiveTab(tabIndex);
  };

  console.log(fpActiveTab);
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick('AI')}>인공지능</TapStyle>
        <TapStyle onClick={() => handleTabClick('CD')}>반도체</TapStyle>
        <TapStyle onClick={() => handleTabClick('BI')}>바이오</TapStyle>
        <TapStyle onClick={() => handleTabClick('AG')}>에너지</TapStyle>
        <TapStyle onClick={() => handleTabClick('OT')}>다른분야</TapStyle>
      </div>
    </div>
  );
}

export default FieldTapBar;
