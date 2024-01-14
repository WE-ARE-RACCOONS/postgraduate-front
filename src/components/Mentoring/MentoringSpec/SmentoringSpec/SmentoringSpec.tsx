'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import useModal from '@/hooks/useModal';
import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../../../TextToggleButton/TextToggleButton';
import MentoringApply from '../../MentoringApply/MentoringApply';
import { ModalMentoringSProps } from '@/types/modal/mentoringDetail';
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
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import x_icon from '../../../../../public/x.png';
import { ValidatorBox } from '@/components/Content/AddTime/AddTime.styled';
function SmentoringSpec(props: ModalMentoringSProps) {
  const { getAccessToken } = useAuth();
  const [data, setData] = useState<MentoringSpecData | null>(null);
  const [date, setDate] = useState('');
  const activeTab = useAtomValue(activeTabAtom);
  const [isActive, setIsActive] = useState(false);
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const buttonContent = button.textContent;
    const newClicked = !isActive;
    setIsActive(newClicked);
    setDate(buttonContent ? buttonContent : '');
    button.style.backgroundColor = newClicked ? '#2FC4B2' : '#F8F9FA';
    button.style.color = newClicked ? '#FFFFFF' : '#3D4044';
  };
  useEffect(() => {
    if (props.mentoringId !== 0) {
      const Token = getAccessToken();
      const headers = {
        Authorization: `Bearer ${Token}`,
      };
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/senior/me/${props.mentoringId}`,
          {
            headers,
          },
        )
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  const acceptMentoring = async () => {
    try {
      const Token = getAccessToken();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/senior/me/${props.mentoringId}/expected`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            date: date,
          }),
        },
      );
      const responseData = await response.json();
      if (props.acceptModalHandler) {
        props.acceptModalHandler();
      }
      props.modalHandler();
    } catch (error) {
      console.error('Error cancelling mentoring:', error);
    }
  };
  return (
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
              src={data ? data.profile : '/user.png'}
            ></ConfirmProfile>
            <ConfirmInfo>
              <ConfirmTitle>
                {data ? data.nickName : ''}&nbsp; 후배와 멘토링
              </ConfirmTitle>
            </ConfirmInfo>
            <TermBox>{data ? data.term : ''}분</TermBox>
          </ConfirmContent>
        </MApplyBox>
      </div>
      <div id="mentoring-topic">원하는 멘토링 주제</div>
      <div style={{ marginBottom: '1.5rem' }}>
        <TextToggleButton text={data ? data.topic : ''} />
      </div>
      <div id="mentoring-topic">사전 질문</div>
      <div style={{ marginBottom: '1.5rem' }}>
        <TextToggleButton text={data ? data.question : ''} />
      </div>
      <div id="mentoring-topic">
        멘토링 시간
        {activeTab === 'waiting' ? (
          <div id="mentoring-time-msg">
            아래의 세가지 중 {data ? data.nickName : ''}님이 선택한 시간대에
            멘토링이 진행돼요
          </div>
        ) : (
          ''
        )}
      </div>
      {activeTab === 'waiting' ? (
        <div>
          {data &&
            data.dates.map((dateString, index) => {
              const dataSplit = dateString;
              const dateParts = (dataSplit || '').split('-');
              const dateSenior = `${dateParts[1]}월 ${dateParts[2]}일 ${dateParts[3]}시 ${dateParts[4]}분`;

              return (
                <div key={index}>
                  <SMCBtn key={index} onClick={handleButtonClick}>
                    {dateSenior}
                  </SMCBtn>
                </div>
              );
            })}
        </div>
      ) : (
        <SMSDate>{data && data.dates}</SMSDate>
      )}
      {activeTab === 'waiting' &&
        (isActive ? (
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
              modalHandler={props.modalHandler}
              mentoringId={props.mentoringId}
            />
            {isActive ? (
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
  );
}

export default SmentoringSpec;
