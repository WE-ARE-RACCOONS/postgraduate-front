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
      <h3 id="profile-done-direction">{PROFILE_DIRECTION.profileDone}</h3>
      <div id="profile-done-sub-direction">
        {PROFILE_SUB_DIRECTION.profileDone}
      </div>
      <Image
        id="profile-done-img"
        src={party_popper}
        alt="프로필 등록 축하 이미지"
      />
      <div id="profile-done-btn-container">
        <button
          onClick={() => {
            router.push('/');
          }}
        >
          확인했어요
        </button>
        <button
          onClick={() => {
            router.push('/mypage');
          }}
        >
          내 프로필 보러가기
        </button>
      </div>
    </ProfileDonePageContainer>
  );
}

export default ProfileDonePage;

const ProfileDonePageContainer = styled.div`
  width: inherit;
  height: 100%;
  white-space: pre-line;

  #profile-done-sub-direction {
    font-size: 15px;
    font-weight: 700;
  }

  #profile-done-img {
    width: 6.25rem;
    height: 6.25rem;
  }
`;
