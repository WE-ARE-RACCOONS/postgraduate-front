import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
        <SeniorProfileImg src={data ? data.profile : ''}>
          {/* {data.profile.length > 0 ? (
            <Image
              src={data.profile}
              alt="profile image"
              width={72}
              height={72}
            />
          ) : (
            <span>이미지가 없습니다</span>
          )} */}
        </SeniorProfileImg>
        <SeniorProfileInfo>
          <SPmajor>{data.major}</SPmajor>
          <SPnickname>{data.nickName}</SPnickname>
          <SPField>{data.lab}</SPField>
        </SeniorProfileInfo>
      </SeniorProfileContent>
      <Skeyword>{data.keyword}</Skeyword>
    </SeniorProfileBox>
  );
}

export default SeniorProfile;
