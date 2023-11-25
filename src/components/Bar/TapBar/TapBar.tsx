'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TapStyle } from './TapBar.styled';
import { useAtom } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { tapType } from '@/types/tap/tap';
import { MentoringData } from '@/types/mentoring/mentoring';
import useAuth from '@/hooks/useAuth';
import { TAB } from '@/constant/tab/ctap';
import MentoringApply from '@/components/MentoringApply/MentoringApply';

function TapBar() {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [data, setData] = useState<MentoringData[] | null>(null);

  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${activeTab}`, {
        headers,
      })
      .then((response) => {
        setData(response.data.data.MentoringInfos);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case TAB.waiting:
        return (
          <div>
            {data &&
              data.map((el, idx) => {
                return <MentoringApply key={idx} data={el} />;
              })}
          </div>
        );
      case TAB.expected:
        return (
          <div>
            {data &&
              data.map((el, idx) => {
                return <MentoringApply key={idx} data={el} />;
              })}
          </div>
        );
      case TAB.done:
        return (
          <div>
            {data &&
              data.map((el, idx) => {
                return <MentoringApply key={idx} data={el} />;
              })}
          </div>
        );
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
