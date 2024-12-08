'use client';
import React, { Suspense } from 'react';
import useAuth from '@/hooks/useAuth';

import TextToggleButton from '@/components/common/TextToggleButton';

import { ModalMentoringProps } from '@/types/modal/mentoringDetail';
import Image from 'next/image';
import x_icon from '../../../../../../public/x.png';

import {
  ModalMentoringBackground,
  ModalClose,
  Color,
  MNick,
  MApplyBox,
  MMainFont,
  MsubFont,
  Mmargin,
  ConfirmContent,
  ConfirmProfile,
  ConfirmInfo,
  ConfirmTitle,
  UserInfo,
  MMTop,
} from './MentoringSpec.styled';

import { useGetMyApplyMentoringListQuery } from '@/hooks/query/useGetMyApplyMentoringList';
import ApplyCancleBtn from '@/components/common/Button/ApplyCancleBtn';
import { useAtom } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { TAB } from '@/constants/tab/ctap';
import Spinner from '@/components/common/Spinner';
import { ErrorBoundary } from 'react-error-boundary';
import { MentoringTabError } from '../error';

function MentoringSpec(props: ModalMentoringProps) {
  const { getUserType } = useAuth();

  const userType = getUserType();

  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const formatTime = (time: string) => {
    if (!time) return '';

    let result = '';
    const timeArr = time.split('-');
    if (timeArr.length >= 5) {
      const month = Number(timeArr[1]);
      const date = Number(timeArr[2]);
      const hour = timeArr[3];
      const min = timeArr[4];

      result += `${month}월 `;
      result += `${date}일 `;
      result +=
        Number(min) == 0
          ? `${hour}시 00분 ~ ${hour}시 30분`
          : `${hour}시 30분 ~ ${Number(hour) + 1}시 00분`;
      return result;
    } else return '';
  };

  const { data: myApplyMentoringList } = useGetMyApplyMentoringListQuery({
    mentoringId: props.mentoringId,
  });

  return (
    <ErrorBoundary fallback={<MentoringTabError />}>
      <Suspense fallback={<Spinner />}>
        <ModalMentoringBackground>
          <MMTop>
            <div id="header-text">멘토링 신청서</div>
            <div id="img">
              <Image
                id="x-icon"
                src={x_icon}
                alt="계정 수정 모달 닫기 버튼"
                width={24}
                height={24}
                style={{}}
                onClick={props.modalHandler}
              />
            </div>
          </MMTop>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
            }}
          >
            <MNick>
              {myApplyMentoringList?.nickName}
              <Color>&nbsp;에게 보낸 신청서</Color>
            </MNick>
            {activeTab === TAB.waiting ? (
              <ApplyCancleBtn
                kind="jcancel"
                btnText={'취소하기'}
                cancelModalHandler={() => {
                  if (props.cancelModalHandler) {
                    props.cancelModalHandler();
                  }
                }}
                // modalHandler={props.modalHandler}
                mentoringId={props.mentoringId}
              />
            ) : (
              ''
            )}
          </div>
          <MApplyBox>
            <ConfirmContent>
              <ConfirmProfile
                src={
                  myApplyMentoringList?.profile
                    ? myApplyMentoringList.profile
                    : '/user.png'
                }
              ></ConfirmProfile>
              <ConfirmInfo>
                <ConfirmTitle>
                  {myApplyMentoringList?.nickName}&nbsp;
                  {userType === 'senior' ? '후배와 멘토링' : '선배와 멘토링'}
                </ConfirmTitle>
                {userType === 'junior' && (
                  <>
                    <UserInfo>
                      {myApplyMentoringList?.postgradu} :
                      {myApplyMentoringList?.major}
                      <br />
                      {myApplyMentoringList?.lab}
                    </UserInfo>
                  </>
                )}
              </ConfirmInfo>
            </ConfirmContent>
          </MApplyBox>
          <div style={{ display: 'flex', padding: '1.56rem 1rem' }}>
            <MMainFont>신청 일정&nbsp;</MMainFont>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <MsubFont>3개의 일정 중 하나로 확정 됩니다</MsubFont>
            </div>
          </div>
          <div>
            {myApplyMentoringList?.dates?.map((date, index) => (
              <TextToggleButton key={index} text={formatTime(date)} />
            ))}
          </div>
          <Mmargin>
            <MMainFont>멘토링 주제</MMainFont>
          </Mmargin>
          <div>
            <TextToggleButton text={myApplyMentoringList?.topic ?? ''} />
          </div>
          <Mmargin>
            <MMainFont>사전 질문</MMainFont>
          </Mmargin>
          <div>
            <TextToggleButton text={myApplyMentoringList?.question ?? ''} />
          </div>
          <div style={{ marginBottom: '7rem' }}>
            <ModalClose onClick={props.modalHandler}>확인 완료</ModalClose>
          </div>
        </ModalMentoringBackground>
      </Suspense>
    </ErrorBoundary>
  );
}

export default MentoringSpec;
