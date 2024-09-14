import React from 'react';
import Image from 'next/image';
import {
  SeniorProfileBox,
  SeniorProfileContent,
  SeniorProfileImg,
  SeniorProfileInfo,
  SPmajor,
  SPnickname,
  Skeyword,
  Keyword,
  SPWrapper,
} from './SeniorProfile.styled';
import { SeniorProfileProps } from '@/types/profile/seniorProfile';
import { useRouter } from 'next/navigation';
import { SeniorProfileKeyWordMaxLength } from '@/components/SeniorProfile/constant';
import auth from '../../../public/auth_mark.png';
function SeniorProfile({ data }: SeniorProfileProps) {
  const router = useRouter();

  console.log(data);
  return (
    <SeniorProfileBox className="tutorial_card">
      <SPWrapper>
        <SeniorProfileContent
          onClick={() => {
            router.push(`/senior/info/${data.seniorId}`);
          }}
        >
          <SeniorProfileImg src={data.profile ? data.profile : ''} />
          <SeniorProfileInfo>
            <SPnickname>
              {data.nickName ? data.nickName : ''}
              <div id="nickname-str">&nbsp;선배님&nbsp;</div>
              {data.certification ? (
                <Image src={auth} alt="auth" width={16} height={16} />
              ) : (
                ''
              )}
            </SPnickname>
            <SPmajor>
              <div>
                {data.postgradu
                  ? `[${data.postgradu.replace('학교', '')}]`
                  : ''}{' '}
                {data.lab}
              </div>

              <div className="professor-str">
                {data.professor} &nbsp;<span>교수님</span>
              </div>
            </SPmajor>
          </SeniorProfileInfo>
        </SeniorProfileContent>
      </SPWrapper>
      <Skeyword>
        {data.keyword &&
          data.keyword
            .map((keyword, index) => <Keyword key={index}>{keyword}</Keyword>)
            .splice(0, SeniorProfileKeyWordMaxLength)}

        {data.keyword.length > SeniorProfileKeyWordMaxLength && (
          <Keyword key={data.keyword.toLocaleString()}>
            +{data.keyword.length - SeniorProfileKeyWordMaxLength}
          </Keyword>
        )}
      </Skeyword>
    </SeniorProfileBox>
  );
}

export default SeniorProfile;
