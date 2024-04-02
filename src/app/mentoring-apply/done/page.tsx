'use client';
import styled from 'styled-components';
import Image from 'next/image';
import cState from '../../../../public/cState.png';
import State from '../../../../public/state.png';
import {
  MENTORING_DONE_TEXT,
  MENTORING_FAIL_TEXT,
} from '@/constants/mentoring/done';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  firAbleTimeAtom,
  orderIdAtom,
  paySeniorIdAtom,
  questionAtom,
  secAbleTimeAtom,
  subjectAtom,
  thiAbleTimeAtom,
} from '@/stores/mentoring';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { successAtom } from '@/stores/condition';
function MentoringApplyDonePage() {
  const router = useRouter();
  const paySeniorId = useAtomValue(paySeniorIdAtom);
  const topic =
    typeof window !== 'undefined' ? window.localStorage.getItem('topic') : null;
  const question =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('question')
      : null;
  const firstTime =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('firstTime')
      : null;
  const secondTime =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('secondTime')
      : null;
  const thirdTime =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('thirdTime')
      : null;
  const oderId =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('orderId')
      : null;
  const success =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('success')
      : null;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        localStorage.getItem('topic') ||
        localStorage.getItem('question') ||
        localStorage.getItem('firstTime') ||
        localStorage.getItem('secondTime') ||
        localStorage.getItem('thirdTime') ||
        localStorage.getItem('orderId')
      ) {
        location.reload();
        window.localStorage.removeItem('topic');
        window.localStorage.removeItem('question');
        window.localStorage.removeItem('firstTime');
        window.localStorage.removeItem('secondTime');
        window.localStorage.removeItem('thirdTime');
        window.localStorage.removeItem('orderId');
      }
    }
  }, []);
  return (
    <MADContainer>
      <MADContent>
        {success === 'true' ? (
          <>
            <Image id="check-img" src={cState} alt="체크 이미지" />
            <h2>{MENTORING_DONE_TEXT.submitDone}</h2>
            <div id="mentoring-done-msg">{MENTORING_DONE_TEXT.waitingMsg}</div>
          </>
        ) : (
          <>
            <Image id="check-img" src={State} alt="체크 이미지" />
            <h2>{MENTORING_FAIL_TEXT.submitDone}</h2>
            <div id="mentoring-done-msg">{MENTORING_FAIL_TEXT.waitingMsg}</div>
          </>
        )}
      </MADContent>
      <MADBtnContainer>
        {success === 'true' ? (
          <>
            <div id="mentoring-done-view-msg">
              {MENTORING_DONE_TEXT.viewMsg}
            </div>
            <button
              id="mentoring-done-view-btn"
              onClick={() => {
                router.push('/junior/mentoring');
              }}
            >
              {MENTORING_DONE_TEXT.viewBtnText}
            </button>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft: '0.2rem',
            }}
          >
            <button
              id="mentoring-done-home-btn"
              onClick={() => {
                router.push('/');
              }}
            >
              {MENTORING_FAIL_TEXT.viewBtnTextLeft}
            </button>
            <button
              id="mentoring-done-home-btn"
              onClick={() => {
                router.push('/');
              }}
            >
              {MENTORING_FAIL_TEXT.viewBtnTextRight}
            </button>
          </div>
        )}
      </MADBtnContainer>
    </MADContainer>
  );
}

const MADContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
`;

const MADContent = styled.div`
  width: 14.82rem;
  height: 14.625rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 12.25rem;

  #check-img {
    width: 5.5rem;
    height: 5.5rem;
    margin-bottom: 2rem;
  }

  #mentoring-done-msg {
    color: #868e96;
    line-height: 140%;
    letter-spacing: -0.5px;
    white-space: pre;
    margin-top: 0.875rem;
  }
`;

const MADBtnContainer = styled.div`
  width: 95%;
  height: 5.5rem;
  margin: 0 auto;
  margin-top: 10rem;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
  text-align: center;

  #mentoring-done-view-btn {
    width: 100%;
    height: 3.375rem;
    margin-top: 0.75rem;
    border-radius: 12px;
    background-color: #2fc4b2;
    color: #fff;
    border: none;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
  #mentoring-done-home-btn {
    width: 9.8rem;
    height: 3.375rem;
    border-radius: 12px;
    background-color: #2fc4b2;
    margin-top: 0.75rem;
    color: #fff;
    border: none;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
`;

export default MentoringApplyDonePage;
