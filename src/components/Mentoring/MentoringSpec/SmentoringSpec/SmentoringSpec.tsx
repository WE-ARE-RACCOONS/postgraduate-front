'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';

import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../../../TextToggleButton/TextToggleButton';
import MentoringApply from '../../MentoringApply/MentoringApply';
import { ModalMentoringSProps } from '@/types/modal/mentoringDetail';
import { useConfirmSeniorMentoring } from '@/hooks/mutations/useConfirmSeniorMentoring';
import { useGetSeniorMentoringListQuery } from '@/hooks/query/useGetSeniorMentoringList';
import {
  ModalMentoringBackground,
  ModalClose,
  ModalBottomBtn,
  MMTop,
  SMCBtn,
  MApplyBox,
  ConfirmContent,
  ConfirmProfile,
  ConfirmInfo,
  ConfirmTitle,
  UserInfo,
  TermBox,
  SMSDate,
  ServiceMsg,
  WarnMsg,
  ModalNClose,
} from './SmentoringSpec.styled';
import ApplyCancleBtn from '../../../Button/ApplyCancleBtn/ApplyCancleBtn';
import SelectedBtn from '@/components/Button/SelectedBtn';
import { activeTabAtom } from '@/stores/tap';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import x_icon from '../../../../../public/x.png';
import { ValidatorBox } from '@/components/Content/AddTime/AddTime.styled';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';
import { accountAtom } from '@/stores/senior';
import { ErrorBoundary } from 'react-error-boundary';
import { MentoringTabError } from '../error';

function SmentoringSpec(props: ModalMentoringSProps) {
  const [date, setDate] = useState('');
  const activeTab = useAtomValue(activeTabAtom);

  const [isAccount, setIsAccount] = useAtom(accountAtom);
  const { data: getSeniorExpectedMentoring } = useGetSeniorMentoringListQuery({
    mentoringId: props.mentoringId as number,
  });
  const { mutate: confirmSeniorExpectedMentoring } =
    useConfirmSeniorMentoring();
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const allBtns = document.querySelectorAll('.smc-btns');
    if (allBtns.length > 0) {
      allBtns.forEach((el) => {
        const btnEl = el as HTMLButtonElement;
        btnEl.style.backgroundColor = '#F8F9FA';
        btnEl.style.color = '#3D4044';
      });
    }

    const button = e.currentTarget;
    const buttonContent = button.textContent;

    if (buttonContent) {
      const match = buttonContent.match(
        /(\d{4})년 (\d{2})월 (\d{2})일 (\d{2})시 (\d{2})분/,
      );
      if (match) {
        const dateSend = `${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
        if (date == dateSend) {
          setDate('');
        } else {
          setDate(dateSend);
          button.style.backgroundColor = '#2FC4B2';
          button.style.color = '#FFF';
        }
      } else {
        setDate('');
      }
    } else {
      setDate('');
    }
  };

  const acceptMentoring = async () => {
    try {
      if (props.mentoringId) {
        confirmSeniorExpectedMentoring({
          date,
          mentoringId: props.mentoringId,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      props.modalHandler();
      window.location.reload();
    }
  };
  return (
    <ErrorBoundary fallback={<MentoringTabError />}>
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
        <div id="mentoring-back">
          <MApplyBox>
            <ConfirmContent>
              <ConfirmProfile
                src={
                  getSeniorExpectedMentoring?.profile
                    ? getSeniorExpectedMentoring.profile
                    : '/user.png'
                }
              ></ConfirmProfile>
              <ConfirmInfo>
                <ConfirmTitle>
                  {getSeniorExpectedMentoring?.nickName
                    ? getSeniorExpectedMentoring.nickName
                    : ''}
                  &nbsp; 후배와 멘토링
                </ConfirmTitle>
              </ConfirmInfo>
              <TermBox>
                {getSeniorExpectedMentoring?.term
                  ? getSeniorExpectedMentoring.term
                  : ''}
                분
              </TermBox>
            </ConfirmContent>
          </MApplyBox>
        </div>
        <div id="mentoring-topic">원하는 멘토링 주제</div>
        <div style={{ marginBottom: '1.5rem' }}>
          <TextToggleButton
            text={
              getSeniorExpectedMentoring?.topic
                ? getSeniorExpectedMentoring.topic
                : ''
            }
          />
        </div>
        <div id="mentoring-topic">사전 질문</div>
        <div style={{ marginBottom: '1.5rem' }}>
          <TextToggleButton
            text={
              getSeniorExpectedMentoring?.question
                ? getSeniorExpectedMentoring.question
                : ''
            }
          />
        </div>
        <div id="mentoring-topic">
          멘토링 시간
          {activeTab === 'waiting' ? (
            <div id="mentoring-time-msg">
              아래의 세가지 중{' '}
              {getSeniorExpectedMentoring?.nickName
                ? getSeniorExpectedMentoring.nickName
                : ''}
              님이 선택한 시간대에 멘토링이 진행돼요
            </div>
          ) : (
            ''
          )}
        </div>
        {activeTab === 'waiting' ? (
          <div>
            {getSeniorExpectedMentoring?.dates.map((dateString, index) => {
              const dataSplit = dateString;
              const dateParts = (dataSplit || '').split('-');
              const dateSenior = `${dateParts[0]}년 ${dateParts[1]}월 ${dateParts[2]}일 ${dateParts[3]}시 ${dateParts[4]}분`;

              return (
                <div key={index}>
                  <SMCBtn
                    className="smc-btns"
                    key={index}
                    onClick={handleButtonClick}
                  >
                    {dateSenior}
                  </SMCBtn>
                </div>
              );
            })}
          </div>
        ) : (
          <SMSDate>{getSeniorExpectedMentoring?.dates}</SMSDate>
        )}
        {activeTab === 'waiting' &&
          (date ? (
            ''
          ) : (
            <WarnMsg>멘토링을 진행할 시간대를 선택해주세요.</WarnMsg>
          ))}
        <ModalBottomBtn>
          {activeTab === 'waiting' ? (
            <>
              <ApplyCancleBtn
                kind="spec"
                btnText={'거절'}
                cancelModalHandler={props.cancelModalHandler}
                mentoringId={props.mentoringId as number}
              />
              {date ? (
                <ModalClose onClick={acceptMentoring}>멘토링 수락</ModalClose>
              ) : (
                <ModalNClose>멘토링 수락</ModalNClose>
              )}
            </>
          ) : (
            <ServiceMsg>멘토링 취소는 고객센터로 문의해주세요</ServiceMsg>
          )}
        </ModalBottomBtn>
      </ModalMentoringBackground>
    </ErrorBoundary>
  );
}

export default SmentoringSpec;
