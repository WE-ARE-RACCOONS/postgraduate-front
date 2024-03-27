'use client';
import {
  PROFILE_DIRECTION,
  PROFILE_SUB_DIRECTION,
} from '@/constants/form/cProfileForm';
import styled from 'styled-components';
import Image from 'next/image';
import party_popper from '../../../../public/party_popper.png';
import { useRouter } from 'next/navigation';

function ProfileDonePage() {
  const router = useRouter();

  return (
    <ProfileDonePageContainer>
      <Image
        width={172}
        height={164}
        style={{ marginTop: '9rem' }}
        id="profile-done-img"
        src={party_popper}
        alt="프로필 등록 축하 이미지"
      />
      <h3 id="profile-done-direction">{PROFILE_DIRECTION.profileDone}</h3>
      <div id="profile-done-sub-direction">
        {PROFILE_SUB_DIRECTION.profileDone}
      </div>
      <div id="profile-done-btn-container">
        <PrevBtn
          style={{ cursor: 'pointer' }}
          onClick={() => {
            router.push('/');
          }}
        >
          닫기
        </PrevBtn>
        <NextAddBtnSet
          onClick={() => {
            router.push('/mypage');
          }}
        >
          내 프로필 확인하기
        </NextAddBtnSet>
      </div>
    </ProfileDonePageContainer>
  );
}

export default ProfileDonePage;
const NextAddBtnSet = styled.button`
  display: flex;
  width: 55%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border: none;
  background: #2fc4b2;
  border-radius: 0.75rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const PrevBtn = styled.button`
  display: flex;
  width: 35%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #adb5bd;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
`;

const ProfileDonePageContainer = styled.div`
  width: inherit;
  height: 100%;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  #profile-done-btn-container {
    display: flex;
    position: absolute;
    width: inherit;
    bottom: 1.62rem;
  }
  #profile-done-direction {
    margin-top: 0.46rem;
    color: #212529;
    text-align: center;
    font-family: Pretendard;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 2.1rem */
    letter-spacing: -0.03125rem;
    margin-bottom: 0.88rem;
  }
  #profile-done-sub-direction {
    color: #868e96;
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.4rem */
    letter-spacing: -0.03125rem;
  }
  #profile-done-img {
  }
`;
