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
  Keyword,
} from './SeniorProfile.styled';
import { SeniorProfileProps } from '@/types/profile/seniorProfile';
import user_icon from '../../../public/user.png';
import { useRouter } from 'next/navigation';
import auth from '../../../public/auth_mark.png';
function SeniorProfile({ data }: SeniorProfileProps) {
  const router = useRouter();
  return (
    <SeniorProfileBox>
      <SeniorProfileContent
        onClick={() => {
          router.push(`/senior/info/${data.seniorId}`);
        }}
      >
        <SeniorProfileImg src={data ? data.profile : ''} />
        <SeniorProfileInfo>
          <SPmajor>
            {data.postgradu}&nbsp;{data.major}
          </SPmajor>
          <SPnickname>
            {data.nickName}
            <Image src={auth} alt="auth" width={16} height={16} />
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
