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
  SPWrapper,
} from './SeniorProfile.styled';
import { SeniorProfileProps } from '@/types/profile/seniorProfile';
import { useRouter } from 'next/navigation';
import auth from '../../../public/auth_mark.png';
import arrow from '../../../public/right-arrow.png';
function SeniorProfile({ data }: SeniorProfileProps) {
  const router = useRouter();

  return (
    <SeniorProfileBox>
      <SPWrapper>
        <SeniorProfileContent
          onClick={() => {
            router.push(`/senior/info/${data.seniorId}`);
          }}
        >
          <SeniorProfileImg src={data.profile ? data.profile : ''} />
          <SeniorProfileInfo>
            <SPnickname>
              {data.nickName ? data.nickName : ''}&nbsp;
              <div id="nickname-str">선배님&nbsp;</div>
              {data.certification ? (
                <Image src={auth} alt="auth" width={16} height={16} />
              ) : (
                ''
              )}
            </SPnickname>
            <SPmajor>
              {data.postgradu ? `[${data.postgradu}]` : ''}&nbsp;
              <div id="professor-str">
                {data.professor ? `${data.professor} 교수님` : ''}
              </div>
            </SPmajor>
            <SPField>{data.lab ? data.lab : ''}</SPField>
          </SeniorProfileInfo>
        </SeniorProfileContent>
        <Image
          src={arrow}
          alt="arrow"
          width={13}
          height={24}
          style={{ marginTop: '3.9rem' }}
        />
      </SPWrapper>
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
