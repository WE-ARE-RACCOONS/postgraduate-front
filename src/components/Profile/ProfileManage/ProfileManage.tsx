import React from 'react';
import { ProfileManageBox } from './ProfileManage.styled';
import { useRouter } from 'next/navigation';

import ContentComponent from '../Box/ContentBox/ContentBox';
import TitleComponent from '../Box/TitleBox/TitleBox';
function ProfileManage() {
  const router = useRouter();
  const handleProfileEditClick = () => {
    router.push('/mypage/edit');
  };
  return (
    <ProfileManageBox>
      <TitleComponent title="회원 상태 변경" />
      <ContentComponent
        content="내 정보 수정"
        onClick={handleProfileEditClick}
      />
      <ContentComponent content="대학원선배 회원으로 변경" />
    </ProfileManageBox>
  );
}

export default ProfileManage;
