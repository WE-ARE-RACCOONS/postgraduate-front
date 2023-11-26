'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../TextToggleButton/TextToggleButton';
import MentoringApply from '../MentoringApply/MentoringApply';

function MentoringSpec({mentoringId}:{mentoringId :number}) {
  const { getAccessToken } = useAuth();
  const [data, setData] = useState<MentoringSpecData | null>(null);

  useEffect(() => {
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${mentoringId}`,
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
  }, []);
  console.log(data)
  return <div>
    <div>{data ? data.nickName : ''} 에게 보낸 신청서</div>
    <MentoringApply data = {data}/>

    <div>신청 일정
      <div>3개의 일정중 하나로 확정 됩니다</div>
      <button>신청 취소</button>
    </div>
    <div>
        <TextToggleButton text = {data ? data.dates.join(', ') : ''}/>
      </div>
    <div>멘토링 주제</div>
    <div>
        <TextToggleButton text = {data ? data.topic : ''}/>
      </div>
    <div>사전 질문</div>
    <div>
        <TextToggleButton text = {data ? data.question : ''}/>
      </div>
  </div>
}

export default MentoringSpec;
