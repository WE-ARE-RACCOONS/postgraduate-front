import React from 'react';
import {
  ProfileBox,
  ProfileImg,
  ProfileInfo,
  ProfileName,
  ProfileNickname,
  ProfileButton,
  ProfileWarn,
} from './Profile.styled';

function Profile() {
  return (
    <ProfileBox>
      <ProfileImg>이미지</ProfileImg>
      <ProfileInfo>
        <ProfileName>
          <ProfileNickname>닉네임</ProfileNickname>
          <ProfileButton>등급버튼</ProfileButton>
        </ProfileName>
        <ProfileWarn>경고문</ProfileWarn>
      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;
