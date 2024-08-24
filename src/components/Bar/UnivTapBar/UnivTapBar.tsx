'use client';
import React from 'react';
import { TapStyle } from './UnivTapBar.styled';
import { smtapType } from '@/types/tap/tap';
import { suactiveTabAtom } from '@/stores/tap';
import { useAtom, useSetAtom } from 'jotai';
import { SMTAB } from '@/constants/tab/ctap';
import { pageNumAtom } from '@/stores/home';
function UnivTapBar() {
  const [fuActiveTab, setFuActiveTab] = useAtom(suactiveTabAtom);
  const setPageNum = useSetAtom(pageNumAtom);

  const handleTabClick = (tabIndex: smtapType) => {
    setFuActiveTab(tabIndex);
    setPageNum(1);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle
          selected={fuActiveTab === SMTAB.ALL}
          onClick={() => handleTabClick(SMTAB.ALL)}
          className="tutorial_school"
        >
          전체선택
        </TapStyle>
        <TapStyle
          selected={fuActiveTab === SMTAB.SEO}
          onClick={() => handleTabClick(SMTAB.SEO)}
        >
          서울대
        </TapStyle>
        <TapStyle
          selected={fuActiveTab === SMTAB.YEO}
          onClick={() => handleTabClick(SMTAB.YEO)}
        >
          연세대
        </TapStyle>
        <TapStyle
          selected={fuActiveTab === SMTAB.KO}
          onClick={() => handleTabClick(SMTAB.KO)}
        >
          고려대
        </TapStyle>
        <TapStyle
          selected={fuActiveTab === SMTAB.KY}
          onClick={() => handleTabClick(SMTAB.KY)}
        >
          카이스트
        </TapStyle>
        <TapStyle
          selected={fuActiveTab === SMTAB.OT}
          onClick={() => handleTabClick(SMTAB.OT)}
        >
          다른학교
        </TapStyle>
      </div>
    </div>
  );
}

export default UnivTapBar;
