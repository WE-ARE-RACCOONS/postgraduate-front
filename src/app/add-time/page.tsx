'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
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

  useEffect(() => {
    if (ableTime) {
      const targetForm = document.querySelector(
        '#add-time-textarea',
      ) as HTMLTextAreaElement;
      targetForm.value = ableTime;
      return;
    }
  }, []);

  const handleClick = () => {
    if (!ableTime) {
      setFlag(true);
      return;
    }

    if (ableTime) {
      router.push('add-chat-link');
      return;
    }
  };

  return (
    <AddTimePageContainer>
      <ProgressBar activeNum={1} />
      <h3 id="add-time-direction">{PROFILE_DIRECTION.addTime}</h3>
      <div id="add-time-sub-direction">{PROFILE_SUB_DIRECTION.addTime}</div>
      <div id="add-time-sub-direction-ex">
        {PROFILE_SUB_DIRECTION.addTimeEx}
      </div>
      <textarea
        name="add-time-textarea"
        id="add-time-textarea"
        placeholder={PROFILE_PLACEHOLDER.addTime}
        onChange={(e) => {
          setAbleTime(e.currentTarget.value);
        }}
      ></textarea>
      {flag && (
        <SingleValidator textColor="#FF0000" msg="가능한 시간을 알려주세요" />
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
    font-size: 15px;
    font-weight: 600;
  }

  #add-time-sub-direction-ex {
    font-size: 12px;
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
