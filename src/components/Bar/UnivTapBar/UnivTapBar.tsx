'use client';
import React from 'react';
import { TapStyle } from './UnivTapBar.styled'
import { smtapType } from '@/types/tap/tap';
import { suactiveTabAtom } from '@/stores/tap';
import { useAtom } from 'jotai';
import { SMTAB } from '@/constants/tab/ctap';
import Image from 'next/image';
import check from '../../../../public/check.png'
function UnivTapBar() {
  const [fuActiveTab, setFuActiveTab] = useAtom(suactiveTabAtom);
  const handleTabClick = (tabIndex: smtapType) => {
    setFuActiveTab(tabIndex);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick(SMTAB.ALL)}>
        <Image
          id="check"
          src={check}
          alt="체크표시"
          width={10}
          height={10}
          priority
          style={{marginRight:'0.5rem'}}
        />전체선택</TapStyle>
        <TapStyle onClick={() => handleTabClick(SMTAB.SEO)}><Image
          id="check"
          src={check}
          alt="체크표시"
          width={10}
          height={10}
          priority
          style={{marginRight:'0.5rem'}}
        />서울대</TapStyle>
        <TapStyle onClick={() => handleTabClick(SMTAB.YEO)}><Image
          id="check"
          src={check}
          alt="체크표시"
          width={10}
          height={10}
          priority
          style={{marginRight:'0.5rem'}}
        />연세대</TapStyle>
        <TapStyle onClick={() => handleTabClick(SMTAB.OT)}><Image
          id="check"
          src={check}
          alt="체크표시"
          width={10}
          height={10}
          priority
          style={{marginRight:'0.5rem'}}
        />다른학교</TapStyle>
      </div>
    </div>
  );
}

export default UnivTapBar;
