import React from 'react';
import { ProfileManageBox } from './ProfileManage.styled';

import ContentComponent from '../TitleBox/ContentCompo';
import TitleComponent from '../TitleBox/TitleCompo';
function ProfileManage() {
  return (
    <ProfileManageBox>
      <TitleComponent title="프로필 관리" />
      <ContentComponent content="내프로필 보기" />
      <ContentComponent content="내프로필 수정" />
      <ContentComponent content="대학원생 인증하기" />
    </ProfileManageBox>
  );
}

export default ProfileManage;
