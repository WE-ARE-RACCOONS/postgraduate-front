import React, { useEffect } from 'react';
import {
  SeniorProfileBox,
  SeniorProfileContent,
  SeniorProfileImg,
  SeniorProfileInfo,
  SPmajor,
  SPnickname,
  SPField,
} from './SeniorProfile.styled';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

function SeniorProfile() {
  useEffect(() => {
    const { getAccessToken } = useAuth();
    const Token = getAccessToken();
    const headers = {
      Authorization: `Bearer ${Token}`,
    };

    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/`, { headers })
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  },[]);
  return (
    <SeniorProfileBox>
      <SeniorProfileContent>
        <SeniorProfileImg>프로필</SeniorProfileImg>
        <SeniorProfileInfo>
          <SPmajor>전공</SPmajor>
          <SPnickname>이름</SPnickname>
          <SPField>연구 분야</SPField>
        </SeniorProfileInfo>
      </SeniorProfileContent>
    </SeniorProfileBox>
  );
}

export default SeniorProfile;
