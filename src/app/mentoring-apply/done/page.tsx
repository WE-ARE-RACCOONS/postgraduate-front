'use client';
import styled from 'styled-components';
import Image from 'next/image';
import cState from '../../../../public/cState.png';
import { MENTORING_DONE_TEXT } from '@/constants/mentoring/done';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { firAbleTimeAtom, orderIdAtom, paySeniorIdAtom, questionAtom, secAbleTimeAtom, subjectAtom, thiAbleTimeAtom } from '@/stores/mentoring';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react'
import useAuth from '@/hooks/useAuth';
function MentoringApplyDonePage() {
  const router = useRouter();
  const oderId = useAtomValue(orderIdAtom);
  const topic = useAtomValue(subjectAtom);
  const question = useAtomValue(questionAtom);
  const firstTime = useAtomValue(firAbleTimeAtom);
  const secondTime = useAtomValue(secAbleTimeAtom);
  const thirdTime = useAtomValue(thiAbleTimeAtom);
  const paySeniorId = useAtomValue(paySeniorIdAtom);
  const { getAccessToken } = useAuth();
  const payHandler = () => {
    const accessTkn = getAccessToken();
    if (
      accessTkn &&
      topic &&
      question &&
      firstTime &&
      secondTime &&
      thirdTime
    ) {
      const timeArr = [firstTime, secondTime, thirdTime];

      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/applying`,
          {
            orderId:oderId,
            topic: topic,
            question: question,
            date: timeArr.join(','),
          },
          {
            headers: {
              Authorization: `Bearer ${accessTkn}`,
            },
          },
        )
        .then((response) => {
          const res = response.data;
          if (res.code == 'MT202') {
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    payHandler();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('topic');
      window.localStorage.removeItem('question');
      window.localStorage.removeItem('firstTime');
      window.localStorage.removeItem('secondTime');
      window.localStorage.removeItem('thirdTime');
    }
  }, [topic, question, firstTime, secondTime, thirdTime]);
  return (
    <MADContainer>
      <MADContent>
        <Image id="check-img" src={cState} alt="체크 이미지" />
        <h2>{MENTORING_DONE_TEXT.submitDone}</h2>
        <div id="mentoring-done-msg">{MENTORING_DONE_TEXT.waitingMsg}</div>
      </MADContent>
      <MADBtnContainer>
        <div id="mentoring-done-view-msg">{MENTORING_DONE_TEXT.viewMsg}</div>
        <button
          id="mentoring-done-view-btn"
          onClick={() => {
            router.push('/junior/mentoring');
          }}
        >
          {MENTORING_DONE_TEXT.viewBtnText}
        </button>
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
`;

export default MentoringApplyDonePage;
