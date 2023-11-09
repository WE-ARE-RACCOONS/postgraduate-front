import React from 'react';
import TitleComponent from '../TitleBox/TitleCompo';
import ContentComponent from '../TitleBox/ContentCompo';
import { ProfileStateChangeBox } from './ProfileStsteChange.styled';
function ProfileStateChange() {
  return (
    <ProfileStateChangeBox>
      <TitleComponent title="회원 상태 변경"></TitleComponent>
      <ContentComponent content="후배회원으로 상태 변경하기"></ContentComponent>
    </ProfileStateChangeBox>
  );
}

export default ProfileStateChange;
