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
import user_icon from '../../../public/user.png';
import { useRouter } from 'next/navigation';
function SeniorProfile({ data }: SeniorProfileProps) {
  const router = useRouter();

  return (
    <SeniorProfileBox>
      <SeniorProfileContent onClick={() => {router.push(`/senior/info/${data.seniorId}`)}}>
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
