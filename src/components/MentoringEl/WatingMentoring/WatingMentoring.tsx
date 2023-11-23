'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MentoringApply from '../MentoringApply/MentoringApply';
import useAuth from '@/hooks/useAuth';
import { useAtomValue } from 'jotai';
import { activeTabAtom } from '@/stores/tap';

function WatingMentoring() {
  const [data, setData] = useState(null);
  const { getAccessToken } = useAuth();
  const TapStatus = useAtomValue(activeTabAtom);
  console.log(TapStatus)
  const Token = getAccessToken();
      const headers = {
        Authorization:`Bearer ${Token}`
      }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me?status=${TapStatus}`,{headers})
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <MentoringApply data={data}/>
  )
}

export default WatingMentoring
