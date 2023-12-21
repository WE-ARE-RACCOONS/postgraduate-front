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
  Keyword
} from './SeniorProfile.styled';
import { SeniorProfileProps } from '@/types/profile/seniorProfile';
import auth from '../../../public/auth_mark.png';
function SeniorProfile({ data }: SeniorProfileProps) {
  return (
    <SeniorProfileBox>
      <SeniorProfileContent>
         <SeniorProfileImg src={data ? data.profile : ''}/>
        <SeniorProfileInfo>
          <SPmajor>{data.major}</SPmajor>
          <SPnickname>{data.nickName}
          <Image
              src={auth}
              alt="auth"
              width={16}
              height={16}
            />
          </SPnickname>
          <SPField>{data.lab}</SPField>
        </SeniorProfileInfo>
      </SeniorProfileContent>
      <Skeyword>
        {data.keyword.map((keyword, index) => (
          <Keyword key={index}>{keyword}</Keyword>
        ))}
        </Skeyword>
    </SeniorProfileBox>
  );
}

export default SeniorProfile;
