'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import useModal from '@/hooks/useModal';
import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../../../TextToggleButton/TextToggleButton';
import MentoringApply from '../../MentoringApply/MentoringApply';
import { ModalMentoringSProps } from '@/types/modal/mentoringDetail';
import { ModalMentoringBackground, ModalClose ,ModalBottomBtn} from './SmentoringSpec.styled';
import ApplyCancleBtn from '../../../Button/ApplyCancleBtn/ApplyCancleBtn';
import SelectedBtn from '@/components/Button/SelectedBtn';
function SmentoringSpec(props: ModalMentoringSProps) {
  const { getAccessToken } = useAuth();
  const [data, setData] = useState<MentoringSpecData | null>(null);
  const [date, setDate] = useState('');

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
        console.log(response.data.data)
          setData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);
  useEffect(() => {
    if (props.mentoringId !== 0) {
        acceptMentoring();
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
            date:date,
          }),
        },
      );
      const responseData = await response.json();
      console.log(responseData)
      props.acceptModalHandler();
      props.modalHandler();
    } catch (error) {
      console.error('Error cancelling mentoring:', error);
    }
  };
  return (
    <ModalMentoringBackground>
      <MentoringApply data={data} />
      <div>원하는 멘토링 주제</div>
      <div>
        <TextToggleButton text={data ? data.topic : ''} />
      </div>
      <div>사전 질문</div>
      <div>
        <TextToggleButton text={data ? data.question : ''} />
      </div>
      <div>
        멘토링 시간

        <div>
        <div>아래의 세가지 중{data ? data.nickName : ''}님이 선택한 시간대에 멘토링이 진행돼요</div>
          
        </div>
      </div>
      <div>
      {data && data.dates.map((date, index) => (
        <div>
    <button key={index} onClick={(e) => setDate(e.currentTarget.textContent??'')}>{date}</button>
    </div>
  ))}
      </div>
      <ModalBottomBtn>
      <ApplyCancleBtn
              btnText={'거절'}
              cancelModalHandler={props.cancelModalHandler}
              modalHandler={props.modalHandler}
              mentoringId={props.mentoringId}
            />
      <ModalClose onClick={acceptMentoring}>멘토링 수락</ModalClose>
      </ModalBottomBtn>
    </ModalMentoringBackground>
  );
}

export default SmentoringSpec;
