import React,{useEffect, useState} from 'react'
import useAuth from '@/hooks/useAuth';
import axios from 'axios';

function MentoringSpec() {
  const { getAccessToken } = useAuth();
  const[data, setData] = useState();

  useEffect(() => {
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${mentoringId}`, {
        headers,
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
      {}에게 보낸 신청서
    </div>
  )
}

export default MentoringSpec;
