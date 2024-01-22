'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
import BackHeader from '@/components/Header/BackHeader';
import Scheduler from '@/components/Scheduler';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  PROFILE_DIRECTION,
  PROFILE_PLACEHOLDER,
  PROFILE_SUB_DIRECTION,
} from '@/constants/form/cProfileForm';
import { sAbleTime } from '@/stores/senior';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function AddTimePage() {
  const [ableTime, setAbleTime] = useAtom(sAbleTime);
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (ableTime.length < 3) {
      setFlag(true);
      return;
    }

    if (ableTime.length >= 3) {
      setFlag(false);
      router.push('add-chat-link');
      return;
    }
  };

  return (
    <AddTimePageContainer>
      <BackHeader headerText='일정 입력'/>
      <ProgressBar activeNum={1} />
      <div style={{marginLeft:'1rem',marginTop:'1.25rem',marginBottom:'1.5rem'}}>
      <h3 id="add-time-direction">{PROFILE_DIRECTION.addTime}</h3>
      <div id="add-time-sub-direction-ex">{PROFILE_SUB_DIRECTION.addTime}</div>
      </div>
      <Scheduler />
      {flag && (
        <SingleValidator
          textColor="#FF0000"
          msg="가능한 시간을 3개 이상 입력해주세요"
        />
      )}
      <div id="add-time-btn-container">
        <button
          onClick={() => {
            router.back();
          }}
        >
          이전
        </button>
        <button onClick={handleClick}>다음</button>
      </div>
    </AddTimePageContainer>
  );
}

export default AddTimePage;

const AddTimePageContainer = styled.div`
  width: inherit;
  height: 100%;
  font-family: 'Pretendard';
  white-space: pre-line;

  #add-time-sub-direction {
   color: #212529;
font-family: Pretendard;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 1.75rem */
letter-spacing: -0.03125rem;
  }

  #add-time-sub-direction-ex {
    margin-top: 0.5rem;
    color: #212529;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.225rem */
letter-spacing: -0.03125rem;
  }

  #add-time-textarea {
    width: 20.5rem;
    height: 6.7rem;
    resize: none;
  }

  #add-time-btn-container {
    width: max-content;
    height: 1.375rem;
    display: flex;
  }
`;
