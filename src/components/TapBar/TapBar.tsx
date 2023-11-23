'use client';
import React, { useState } from 'react';
import {TapStyle} from './TapBar.styled';
import AwaitingConfirm from '../MyMentoring/AwaitingConfirm/AwaitingConfirm';

function TapBar() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
      };

      const renderTabContent = () => {
        switch (activeTab) {
          case 0:
            return <AwaitingConfirm/>;
          case 1:
            return <div>진행 예정 컴포넌트</div>;
          case 2:
            return <div>완료 컴포넌트</div>;
          default:
            return null;
        }
      };
  return (
    <div>
      <div style={{ display: 'flex' }}>

          <TapStyle onClick={() => handleTabClick(0)}>확정 대기</TapStyle>
          <TapStyle onClick={() => handleTabClick(1)}>진행 예정</TapStyle>
          <TapStyle onClick={() => handleTabClick(2)}>완료</TapStyle>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  )
}

export default TapBar
