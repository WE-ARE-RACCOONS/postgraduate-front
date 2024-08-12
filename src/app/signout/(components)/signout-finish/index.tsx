'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { SignOutInfoContainer } from '@/app/signout/(components)/signout-type-select';
import SignOutImage from '/public/signout.png';
import NextBtn from '@/components/Button/NextBtn';
export function SignOutFinish({ onClick }: { onClick: () => void }) {
  return (
    <SignOutInfoContainer className="stepper-tab">
      <FinishImageWrapper>
        <Image src={SignOutImage} width={170} height={120} alt="logo" />
      </FinishImageWrapper>
      <div className="nextBtn_container">
        <NextBtn
          kind={'route'}
          btnText="회원탈퇴완료"
          onClick={onClick}
          url="/"
        />
      </div>
    </SignOutInfoContainer>
  );
}

const FinishImageWrapper = styled.div`
  display: flex;
  margin: 229px auto;
  justify-content: center;
`;
