import React from 'react';
import { ProfileManageBox } from './ProfileManage.styled';
import { useRouter } from 'next/navigation';


import ContentComponent from '../Box/ContentBox/ContentBox';
import TitleComponent from '../Box/TitleBox/TitleBox';
function ProfileManage() {
  const router = useRouter();
  const handleMentoringClick = () => {
    router.push('/mentoring/me');
  };

  return (
    <ProfileManageBox>
      <TitleComponent title="멘토링" />
      <ContentComponent content="내 멘토링" onClick={handleMentoringClick}/>
      <ContentComponent content="선배멘토로 변경" />
    </ProfileManageBox>
  );
}

export default ProfileManage;
