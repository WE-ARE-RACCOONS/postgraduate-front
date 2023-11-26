import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { MentoringSpecData } from '@/types/mentoring/mentoring';
import TextToggleButton from '../TextToggleButton/TextToggleButton';

function MentoringSpec() {
  const { getAccessToken } = useAuth();
  const [data, setData] = useState<MentoringSpecData[] | null>(null);

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
  return <div>{}에게 보낸 신청서
    <div>신청 일정
      <div>3개의 일정중 하나로 확정 됩니다</div>
      <button>신청 취소</button>
      <div>
        <TextToggleButton text = {''}/>
      </div>

    </div>
    <div>멘토링 주제</div>
    <div>사전 질문</div>
  </div>;
}

export default MentoringSpec;
