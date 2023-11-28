'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import useModal from '@/hooks/useModal';
import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../../TextToggleButton/TextToggleButton';
import MentoringApply from '../MentoringApply/MentoringApply';
import { ModalMentoringProps } from '@/types/modal/mentoringDetail';
import { ModalMentoringBackground, ModalClose } from './MentoringSpec.styled';
import ApplyCancleBtn from '../../Button/ApplyCancleBtn/ApplyCancleBtn';
function MentoringSpec(props: ModalMentoringProps) {
  const { getAccessToken } = useAuth();
  const [data, setData] = useState<MentoringSpecData | null>(null);

  useEffect(() => {
    if (props.mentoringId!== null) {
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${props.mentoringId}`,
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
  return (
    <ModalMentoringBackground>
      <div>{data ? data.nickName : ''} 에게 보낸 신청서</div>
      <MentoringApply data={data} />

      <div>
        신청 일정
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>3개의 일정중 하나로 확정 됩니다</div>
          <div>
            <ApplyCancleBtn
              btnText={'취소하기'}
              cancelModalHandler={props.cancelModalHandler}
              modalHandler={props.modalHandler}
              mentoringId={props.mentoringId}
            />
          </div>
        </div>
      </div>
      <div>
        <TextToggleButton text={data ? data.dates.join(', ') : ''} />
      </div>
      <div>멘토링 주제</div>
      <div>
        <TextToggleButton text={data ? data.topic : ''} />
      </div>
      <div>사전 질문</div>
      <div>
        <TextToggleButton text={data ? data.question : ''} />
      </div>
      <ModalClose onClick={props.modalHandler}>확인 했어요</ModalClose>
    </ModalMentoringBackground>
  );
}

export default MentoringSpec;
