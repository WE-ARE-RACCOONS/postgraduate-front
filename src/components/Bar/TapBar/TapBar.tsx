'use client';
import React, { useState } from 'react';
import { TapStyle } from './TapBar.styled';
import { useAtom } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { tapType } from '@/types/tap/tap';
import MentoringApply from '@/components/MentoringApply/MentoringApply';

function TapBar() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'waiting':
        return <MentoringApply />;
      case 'expected':
        return <div>진행 예정 컴포넌트</div>;
      case 'done':
        return <div>완료 컴포넌트</div>;
      default:
        return null;
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick('waiting')}>확정 대기</TapStyle>
        <TapStyle onClick={() => handleTabClick('expected')}>
          진행 예정
        </TapStyle>
        <TapStyle onClick={() => handleTabClick('done')}>완료</TapStyle>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
}

export default TapBar;
