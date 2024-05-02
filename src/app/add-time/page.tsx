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
import useAuth from '@/hooks/useAuth';
import {
  mySeniorId,
  sAbleTime,
  sMultiIntroduce,
  sRecommendedFor,
  sSingleIntroduce,
} from '@/stores/senior';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function AddTimePage() {
  const oneLiner = useAtomValue(sSingleIntroduce);
  const info = useAtomValue(sMultiIntroduce);
  const target = useAtomValue(sRecommendedFor);
  const [ableTime, setAbleTime] = useAtom(sAbleTime);
  const [flag, setFlag] = useState(false);
  const [seniorId, setSeniorId] = useAtom(mySeniorId);
  const router = useRouter();
  const { getAccessToken } = useAuth();

  const handleClick = () => {
    if (ableTime.length < 3) {
      setFlag(true);
      return;
    }

    // if (ableTime.length >= 3) {
    //   setFlag(false);
    //   router.push('add-chat-link');
    //   return;
    // }
  };

  const handleSubmit = () => {
    if (info && oneLiner && target && ableTime.length >= 3) {
      getAccessToken().then((accessTkn) => {
        if (accessTkn) {
          axios
            .patch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/profile`,
              {
                info: info,
                target: target,
                times: ableTime,
                oneLiner: oneLiner,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessTkn}`,
                },
              },
            )
            .then((response) => {
              const res = response.data;

              if (res.code == 'SNR201') {
                setSeniorId(res.data.seniorId);
                router.push('/profile/done');
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
      return;
    }
  };

  return (
    <AddTimePageContainer>
      <BackHeader headerText="일정 입력" />
      <ProgressBar totalNum={2} activeNum={1} />
      <div
        style={{
          marginLeft: '1rem',
          marginTop: '1.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <h3 id="add-time-direction">{PROFILE_DIRECTION.addTime}</h3>
        <div id="add-time-sub-direction-ex">
          {PROFILE_SUB_DIRECTION.addTime}
        </div>
      </div>
      <Scheduler />
      {flag && (
        <SingleValidator
          textColor="#FF0000"
          msg="가능한 시간을 3개 이상 입력해주세요"
        />
      )}
      <div id="add-time-btn-container">
        <PrevBtn
          onClick={() => {
            router.push('/mypage');
          }}
        >
          이전
        </PrevBtn>
        {ableTime.length >= 3 ? (
          <NextAddBtnSet
            onClick={() => {
              handleClick();
              handleSubmit();
            }}
          >
            완료
          </NextAddBtnSet>
        ) : (
          <NextAddBtn onClick={handleClick}>완료</NextAddBtn>
        )}
      </div>
    </AddTimePageContainer>
  );
}

export default AddTimePage;

const NextAddBtn = styled.button`
  display: flex;
  width: 55%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border-radius: 0.75rem;
  background: #dee2e6;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const NextAddBtnSet = styled.button`
  display: flex;
  width: 55%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border: none;
  background: #2fc4b2;
  border-radius: 0.75rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const PrevBtn = styled.button`
  display: flex;
  width: 35%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #adb5bd;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
  cursor: pointer;
`;

const AddTimePageContainer = styled.div`
  position: absolute;
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
    position: absolute;
    width: inherit;
    display: flex;
    bottom: 1rem;
  }
`;
