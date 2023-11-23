'use client';
import React, { useState } from 'react';
import { TapStyle } from './TapBar.styled';
import { useAtom } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { tapType } from '@/types/tap/tap';
import WatingMentoring from '@/components/MentoringEl/WatingMentoring/WatingMentoring';

function TapBar() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'WAITING':
        return <WatingMentoring />;
      case 'EXPECTED':
        return <div>진행 예정 컴포넌트</div>;
      case 'DONE':
        return <div>완료 컴포넌트</div>;
      default:
        return null;
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TapStyle onClick={() => handleTabClick('WAITING')}>확정 대기</TapStyle>
        <TapStyle onClick={() => handleTabClick('EXPECTED')}>
          진행 예정
        </TapStyle>
        <TapStyle onClick={() => handleTabClick('DONE')}>완료</TapStyle>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
}

export default TapBar;
