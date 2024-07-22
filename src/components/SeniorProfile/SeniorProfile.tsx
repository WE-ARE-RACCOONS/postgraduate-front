import React from 'react';
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
        <SeniorProfileImg src={data.profile ? data.profile : ''} />
        <SeniorProfileInfo>
          <SPnickname>
            {data.nickName ? data.nickName : ''}&nbsp;
            {data.certification ? (
              <Image src={auth} alt="auth" width={14} height={14} />
            ) : (
              ''
            )}
          </SPnickname>
          <SPmajor>
            {data.postgradu ? data.postgradu : ''}&nbsp;
            <div id="professor-str">
              {data.professor ? `${data.professor}교수님` : ''}
            </div>
          </SPmajor>
          <SPField>{data.lab ? data.lab : ''}</SPField>
        </SeniorProfileInfo>
      </SeniorProfileContent>
      <Skeyword>
        {data.keyword &&
          data.keyword.map((keyword, index) => (
            <Keyword key={index}>{keyword}</Keyword>
          ))}
      </Skeyword>
    </SeniorProfileBox>
  );
}

export default SeniorProfile;
