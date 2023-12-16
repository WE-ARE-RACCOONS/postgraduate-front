import React, { useEffect, useState } from 'react';
import {
  SeniorProfileBox,
  SeniorProfileContent,
  SeniorProfileImg,
  SeniorProfileInfo,
  SPmajor,
  SPnickname,
  SPField,
  Skeyword,
} from './SeniorProfile.styled';
import { SeniorProfileProps } from '@/types/profile/seniorProfile';
function SeniorProfile({ data }: SeniorProfileProps) {
  return (
    <SeniorProfileBox>
      <SeniorProfileContent>
        <SeniorProfileImg>프로필</SeniorProfileImg>
        <SeniorProfileInfo>
          <SPmajor>전공</SPmajor>
          <SPnickname>이름</SPnickname>
          <SPField>연구 분야</SPField>
        </SeniorProfileInfo>
        <Skeyword>키워드</Skeyword>
      </SeniorProfileContent>
    </SeniorProfileBox>
  );
}

export default SeniorProfile;
