'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
import TimeListBox from '@/components/Box/TimeListBox';
import BackHeader from '@/components/Header/BackHeader';
import SelectTime from '@/components/SelectTime';
import { MENTORING_SCHEDULE } from '@/constants/form/cMentoringApply';
import useAuth from '@/hooks/useAuth';
import { TimeObj } from '@/types/scheduler/scheduler';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function MentoringApplySchedulePage() {
  const [sNickname, setSNickname] = useState('');
  const [timeArr, setTimeArr] = useState([]);
  const { getAccessToken } = useAuth();
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const seniorId = pathArr[2];
  const router = useRouter();

  useEffect(() => {
    const accessTkn = getAccessToken();
    if (accessTkn) {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/${seniorId}/times`, {
          headers: {
            Authorization: `Bearer ${accessTkn}`,
          },
        })
        .then((response) => {
          const res = response.data;

          if (res.code == 'SNR200') {
            setSNickname(res.data.nickName);
            setTimeArr(res.data.times);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <MASContainer $timeArr={timeArr}>
      <BackHeader headerText="멘토링 일정 제안" />
      <ProgressBar activeNum={1} />
      <div id="senior-schedule-title-wrapper">
        <MASTitle>
          {sNickname}
          {MENTORING_SCHEDULE.sScheduleTitle}
        </MASTitle>
      </div>
      <div id="senior-schedule-subtitle-wrapper">
        <MASSubtitle>{MENTORING_SCHEDULE.sScheduleSubtitle}</MASSubtitle>
      </div>
      <div id="time-list-box-wrapper">
        <TimeListBox timeArr={timeArr} />
      </div>
      <div id="senior-select-title-wrapper">
        <MASTitle>{MENTORING_SCHEDULE.selectTitle}</MASTitle>
      </div>
      <div id="senior-select-subtitle-wrapper">
        <MASSubtitle>{MENTORING_SCHEDULE.selectSubtitle}</MASSubtitle>
      </div>
      <div id="select-time-container">
        <SelectTime placeholder={`첫${MENTORING_SCHEDULE.selectPlaceholder}`} />
        <SelectTime placeholder={`두${MENTORING_SCHEDULE.selectPlaceholder}`} />
        <SelectTime placeholder={`세${MENTORING_SCHEDULE.selectPlaceholder}`} />
      </div>
      <MASBtnContainer $timeArr={timeArr}>
        <button
          id="prev-btn"
          className="mas-btn"
          onClick={() => {
            router.back();
          }}
        >
          이전
        </button>
        <button id="next-btn" className="mas-btn">
          다음
        </button>
      </MASBtnContainer>
    </MASContainer>
  );
}

const MASContainer = styled.div<{ $timeArr: Array<TimeObj> }>`
  width: inherit;
  height: 100%;
  position: relative;

  #senior-schedule-title-wrapper {
    position: absolute;
    width: 95%;
    height: 1.375rem;
    top: 5.25rem;
    left: 0.5rem;
  }

  #senior-schedule-subtitle-wrapper {
    position: absolute;
    width: 95%;
    height: 1.25rem;
    top: 6.875rem;
    left: 0.5rem;
  }

  #time-list-box-wrapper {
    position: absolute;
    width: 95%;
    height: max-content;
    min-height: 9.5rem;
    top: 8.625rem;
    left: 50%;
    transform: translateX(-50%);
  }

  #senior-select-title-wrapper {
    position: absolute;
    top: calc(
      ${(props) =>
        props.$timeArr
          ? `${props.$timeArr.length} * 1.5rem + 16.125rem`
          : '20.625rem'}
    );
    left: 0.5rem;
  }

  #senior-select-subtitle-wrapper {
    position: absolute;
    top: calc(
      ${(props) =>
        props.$timeArr
          ? `${props.$timeArr.length} * 1.5rem + 17.625rem`
          : '22.125rem'}
    );
    left: 0.5rem;
  }

  #select-time-container {
    width: 95%;
    height: 10.57rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: calc(
      ${(props) =>
        props.$timeArr
          ? `${props.$timeArr.length} * 1.5rem + 19.875rem`
          : '24.375rem'}
    );
    left: 0.5rem;
  }
`;

const MASTitle = styled.div`
  width: 100%;
  height: 1.375rem;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.5px;
`;

const MASSubtitle = styled.div`
  width: 100%;
  height: 1.25rem;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.5px;
  color: #868e96;
`;

const MASBtnContainer = styled.div<{ $timeArr: Array<TimeObj> }>`
  width: 93%;
  height: 3.375rem;
  position: relative;
  margin-top: calc(
    ${(props) =>
      props.$timeArr
        ? `${props.$timeArr.length} * 1.5rem + 34.875rem`
        : '39.375rem'}
  );
  margin-left: 1rem;
  margin-bottom: 1.375rem;
  display: flex;
  justify-content: space-between;

  .mas-btn {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    font-family: Pretendard;
    border-radius: 12px;
    border: none;
    cursor: pointer;
  }

  #prev-btn {
    width: 34%;
    height: 3.375rem;
    background-color: #adb5bd;
  }

  #next-btn {
    width: 62%;
    height: 3.375rem;
    background-color: #f1f3f5;
  }
`;

export default MentoringApplySchedulePage;
