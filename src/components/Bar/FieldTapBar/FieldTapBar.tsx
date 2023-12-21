'use client';
import React from 'react';
import { TapStyle } from './FieldTapBar.styled';
import { sftapType } from '@/types/tap/tap';
import { sfactiveTabAtom } from '@/stores/tap';
import { useAtom } from 'jotai';
import { SFTAB } from '@/constants/tab/ctap';
function FieldTapBar() {
  const [fpActiveTab, setFpActiveTab] = useAtom(sfactiveTabAtom);
  const handleTabClick = (tabIndex: sftapType) => {
    setFpActiveTab(tabIndex);
  };

  return (
    <div>
      <div style={{ display: 'flex',}}>
        <TapStyle selected={fpActiveTab === SFTAB.AI} onClick={() => handleTabClick(SFTAB.AI)}>인공지능</TapStyle>
        <TapStyle selected={fpActiveTab === SFTAB.CD} onClick={() => handleTabClick(SFTAB.CD)}>반도체</TapStyle>
        <TapStyle selected={fpActiveTab === SFTAB.BI} onClick={() => handleTabClick(SFTAB.BI)}>바이오</TapStyle>
        <TapStyle selected={fpActiveTab === SFTAB.AG} onClick={() => handleTabClick(SFTAB.AG)}>에너지</TapStyle>
        <TapStyle selected={fpActiveTab === SFTAB.OT} onClick={() => handleTabClick(SFTAB.OT)}>다른분야</TapStyle>
      </div>
    </div>
  );
}

export default FieldTapBar;
