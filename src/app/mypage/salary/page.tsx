'use client';
import SalaryBox from '@/components/Box/SalaryBox';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import styled from 'styled-components';
import { tapType } from '@/types/tap/tap';
import { TAB, STAB_STATE } from '@/constants/tab/ctap';
import SalaryProfile from '@/components/Profile/salaryProfile/salaryProfile';
import BackHeader from '@/components/Header/BackHeader';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';

function SalaryPage() {
  const { getAccessToken, getUserType, removeTokens } = useAuth();
  const [data, setData] = useState([]);
  const [salaryDate, setSalaryDate] = useState('');
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [activeTab, setActiveTab] = useState(TAB.waiting);
  const router = useRouter();

  const handleTabClick = (tabIndex: tapType) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    const userType = getUserType();

    getAccessToken().then((token) => {
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        if (userType == 'senior') {
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/salary/${activeTab}`, {
              headers,
            })
            .then((res) => {
              if (findExCode(res.data.code)) {
                removeTokens();
                location.reload();
                return;
              }
              if (res.data.code == 'SLR200') {
                setData(res.data.data.salaryDetails);
              }
            })
            .catch(function (error) {
              console.error(error);
            });
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/salary`, { headers })
            .then((res) => {
              if (findExCode(res.data.code)) {
                removeTokens();
                location.reload();
                return;
              }
              if (res.data.code == 'SLR200') {
                setSalaryDate(res.data.data.salaryDate);
                setSalaryAmount(res.data.data.salaryAmount);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    });
  }, [activeTab]);

  const renderTabContent = () => {
    return (
      <div>
        {data && data.length > 0 ? (
          <div>
            {data.map((el, idx) => (
              <div key={idx}>
                <SalaryProfile data={el} />
              </div>
            ))}
          </div>
        ) : (
          <NoMentoring>{`${STAB_STATE[activeTab]}인 멘토링이 없어요`}</NoMentoring>
        )}
      </div>
    );
  };

  return (
    <>
      <BackHeader headerText="정산내역" />
      <div style={{ marginTop: '1rem' }}>
        <SalaryBox salaryDate={salaryDate} salaryAmount={salaryAmount} />
      </div>
      <TabWrap>
        <TapStyle
          selected={activeTab === TAB.waiting}
          onClick={() => handleTabClick('waiting')}
        >
          정산 예정
        </TapStyle>
        <TapStyle
          selected={activeTab === TAB.done}
          onClick={() => handleTabClick('done')}
        >
          정산완료
        </TapStyle>
      </TabWrap>
      <div>{renderTabContent()}</div>
    </>
  );
}
const NoMentoring = styled.div`
  color: #adb5bd;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 1.4rem */
  margin-top: 1rem;
`;
const TabWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c2cede;
  justify-content: center;
`;
interface TapStyleProps {
  selected: boolean;
}
const TapStyle = styled.div<TapStyleProps>`
  padding: 0 2rem;
  width: 9rem;
  height: 3.37rem;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #495565;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 140%;
  border-bottom: ${({ selected }) => (selected ? '2px solid #495565' : 'none')};
  color: ${({ selected }) => (selected ? '#495565' : '#C2CEDE')};
`;
export default SalaryPage;
