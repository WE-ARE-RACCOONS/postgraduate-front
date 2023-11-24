'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MentoringApply from '../MentoringApply/MentoringApply';
import useAuth from '@/hooks/useAuth';
import { useAtomValue } from 'jotai';
import { activeTabAtom } from '@/stores/tap';
import { MentoringData } from '@/types/mentoring/mentoring';

function WatingMentoring() {
  const [data, setData] = useState<MentoringData[] | null>(null);
  const { getAccessToken } = useAuth();
  const TapStatus = useAtomValue(activeTabAtom);

  useEffect(() => {
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me?status=${TapStatus}`,
        { headers },
      )
      .then((response) => {
        console.log(response.data.data.appliedMentoringInfos);
        setData(response.data.data.appliedMentoringInfos);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [TapStatus]);

  return (
    <div>
      {/* {data && data.map(data,index) => (
      <MentoringApply key={index} data={data}/>
    )} */}
      {data && data.map((el, idx) => <MentoringApply key={idx} data={el} />)}
    </div>
  );
}

export default WatingMentoring;
