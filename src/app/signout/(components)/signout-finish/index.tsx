'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { SignOutInfoContainer } from '@/app/signout/(components)/signout-type-select';
import SignOutImage from '/public/signout.png';
import { useSignOutInfo } from '@/app/signout/signoutContext';
import NextBtn from '@/components/Button/NextBtn';
import instance from '@/api/api';
import { useRouter } from 'next/navigation';
export function SignOutFinish() {
  const router = useRouter();
  const { signOutInfo } = useSignOutInfo();
  const _handleSignOutFinish = async () => {
    //회원탈퇴 FLow
    //mutate로 바꿔야 함
    //회원탈퇴 API -> 토큰 제거 -> 버튼에 GA이벤트..?
    if (signOutInfo) {
      await instance
        .post('/auth/signout/KAKAO', {
          reason: signOutInfo.signOutReason,
          etc: signOutInfo.etc,
        })
        .then((res) => {
          _deleteAuthContent();
          router.push('/');
        });
    }
  };

  const _deleteAuthContent = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessExpire');
    localStorage.removeItem('userType');
  };
  return (
    <SignOutInfoContainer className="stepper-tab">
      <FinishImageWrapper>
        <Image src={SignOutImage} width={170} height={120} alt="logo" />
      </FinishImageWrapper>
      <div className="nextBtn_container">
        <NextBtn
          kind={'route'}
          btnText="회원탈퇴완료"
          onClick={_handleSignOutFinish}
        />
      </div>
    </SignOutInfoContainer>
  );
}

const FinishImageWrapper = styled.div`
  display: flex;
  margin: 150px auto;
  justify-content: center;
`;
