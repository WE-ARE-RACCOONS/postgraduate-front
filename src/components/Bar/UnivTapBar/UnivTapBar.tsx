'use client';
import React from 'react';
import { TapStyle } from './UnivTapBar.styled';
import { smtapType } from '@/types/tap/tap';
import { suactiveTabAtom } from '@/stores/tap';
import { useAtom } from 'jotai';
import { SMTAB } from '@/constants/tab/ctap';
import Image from 'next/image';
import check from '../../../../public/check.png';
import nonCheck from '../../../../public/non-check.png';
function UnivTapBar() {
  const [fuActiveTab, setFuActiveTab] = useAtom(suactiveTabAtom);
  const renderCheckmark = (tabIndex:smtapType) => {
    return fuActiveTab === tabIndex ? (
      <Image
        id="check"
        src={check}
        alt="체크표시"
        width={10}
        height={10}
        priority
        style={{ marginRight: '0.5rem' }}
      />
    ) :       
    <Image
    id="nocheck"
    src={nonCheck}
    alt="체크표시"
    width={10}
    height={10}
    priority
    style={{ marginRight: '0.5rem' }}
  />;
  };
  const handleTabClick = (tabIndex: smtapType) => {
    setFuActiveTab(tabIndex);
  };
  
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle selected ={fuActiveTab === SMTAB.ALL} onClick={() => handleTabClick(SMTAB.ALL)}>
        {renderCheckmark(SMTAB.ALL)}
          전체선택
        </TapStyle>
        <TapStyle  selected ={fuActiveTab === SMTAB.SEO}onClick={() => handleTabClick(SMTAB.SEO)}>
        {renderCheckmark(SMTAB.SEO)}
          서울대
        </TapStyle>
        <TapStyle selected ={fuActiveTab === SMTAB.YEO} onClick={() => handleTabClick(SMTAB.YEO)}>
        {renderCheckmark(SMTAB.YEO)}
          연세대
        </TapStyle>
        <TapStyle selected ={fuActiveTab === SMTAB.OT}onClick={() => handleTabClick(SMTAB.OT)}>
        {renderCheckmark(SMTAB.OT)}
          다른학교
        </TapStyle>
      </div>
    </div>
  );
}

export default UnivTapBar;
