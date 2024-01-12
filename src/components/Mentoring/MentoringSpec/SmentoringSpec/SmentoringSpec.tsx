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
  SMCBtn
} from './SmentoringSpec.styled';
import ApplyCancleBtn from '../../../Button/ApplyCancleBtn/ApplyCancleBtn';
import SelectedBtn from '@/components/Button/SelectedBtn';
import { activeTabAtom } from '@/stores/tap';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import x_icon from '../../../../../public/x.png';
function SmentoringSpec(props: ModalMentoringSProps) {
  const { getAccessToken } = useAuth();
  const [data, setData] = useState<MentoringSpecData | null>(null);
  const [date, setDate] = useState('');
  const activeTab = useAtomValue(activeTabAtom);
  const [isActive, setIsActive] = useState(false);
  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    const buttonContent = e.currentTarget.textContent;
  setDate(buttonContent ?buttonContent:'');
  setIsActive(!isActive);
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
      <Image
        id="x-icon"
        src={x_icon}
        alt="계정 수정 모달 닫기 버튼"
        width={24}
        height={24}
        style={{marginLeft:'25%'}}
        onClick={props.modalHandler}
      />
      </MMTop>
      <div id ='mentoring-back'>
      <MentoringApply data={data} />
      </div>
      <div id = 'mentoring-topic'>원하는 멘토링 주제</div>
      <div style={{marginBottom:'1.5rem'}}>
        <TextToggleButton text={data ? data.topic : ''} />
      </div>
      <div id = 'mentoring-topic'>사전 질문</div>
      <div style={{marginBottom:'1.5rem'}}>
        <TextToggleButton text={data ? data.question : ''} />
      </div>
      <div id = 'mentoring-topic'>
        멘토링 시간
        {activeTab === 'waiting' ? (
          <div id = 'mentoring-time-msg'>
            아래의 세가지 중{data ? data.nickName : ''}님이 선택한 시간대에
            멘토링이 진행돼요
          </div>
        ) : (
          ''
        )}
      </div>
      {activeTab === 'waiting' ? (
        <div>
          {data &&
            data.dates.map((date, index) => (
              <div>
                <SMCBtn
                isActive={!isActive}
                  key={index}
                  onClick={handleButtonClick}
                >
                  {date}
                </SMCBtn>
              </div>
            ))}
        </div>
      ) : (
        data && data.dates
      )}
      <ModalBottomBtn>
        {activeTab === 'waiting' ? (
          <>
            <ApplyCancleBtn
            kind='spec'
              btnText={'거절'}
              cancelModalHandler={props.cancelModalHandler}
              modalHandler={props.modalHandler}
              mentoringId={props.mentoringId}
            />
            <ModalClose onClick={acceptMentoring}>멘토링 수락</ModalClose>
          </>
        ) : (
          <div>멘토링 취소는 고객센터로 문의해주세요</div>

        )}
      </ModalBottomBtn>
    </ModalMentoringBackground>
  );
}

export default SmentoringSpec;
