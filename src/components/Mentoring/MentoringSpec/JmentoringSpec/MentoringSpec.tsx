'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import useModal from '@/hooks/useModal';
import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../../../TextToggleButton/TextToggleButton';
import MentoringApply from '../../MentoringApply/MentoringApply';
import { ModalMentoringProps } from '@/types/modal/mentoringDetail';

import { ModalMentoringBackground, ModalClose
, Color, MNick ,MApplyBox,MMainFont,MsubFont,Mmargin} from './MentoringSpec.styled';

import ApplyCancleBtn from '../../../Button/ApplyCancleBtn/ApplyCancleBtn';
function MentoringSpec(props: ModalMentoringProps) {
  const { getAccessToken } = useAuth();
  const [data, setData] = useState<MentoringSpecData | null>(null);

  useEffect(() => {
    if (props.mentoringId !== 0) {
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
          console.log(response.data.data)
          setData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);
  return (
    <ModalMentoringBackground>
      <div style={{display:'flex',justifyContent:'space-between',padding:'1rem'}}>
      <MNick>{data ? data.nickName : ''}<Color>에게 보낸 신청서</Color></MNick>
      <ApplyCancleBtn
              btnText={'취소하기'}
              cancelModalHandler={props.cancelModalHandler}
              modalHandler={props.modalHandler}
              mentoringId={props.mentoringId}
            />
      </div>
      <MApplyBox>
      <MentoringApply data={data} />
      </MApplyBox>
      <div style={{display:'flex',padding:'1.56rem 1rem'}}>
        <MMainFont>신청 일정</MMainFont>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MsubFont>3개의 일정중 하나로 확정 됩니다</MsubFont>
        </div>
      </div>
      <div>
        <TextToggleButton text={data ? data.dates[0] : ''} />
        <TextToggleButton text={data ? data.dates[1] : ''} />
        <TextToggleButton text={data ? data.dates[2] : ''} />
      </div>
      <Mmargin>
      <MMainFont>멘토링 주제</MMainFont>
      </Mmargin>
      <div>
        <TextToggleButton text={data ? data.topic : ''} />
      </div>
      <Mmargin>
      <MMainFont>사전 질문</MMainFont>
      </Mmargin>
      <div>
        <TextToggleButton text={data ? data.question : ''} />
      </div>
      <ModalClose onClick={props.modalHandler}>확인 완료</ModalClose>
    </ModalMentoringBackground>
  );
}

export default MentoringSpec;
