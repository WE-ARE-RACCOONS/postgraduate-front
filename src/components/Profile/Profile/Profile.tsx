import React from 'react';
import {
  ProfileBox,
  ProfileImg,
  ProfileInfo,
  ProfileName,
  Nickname,
  Button,
  ProfileWarn,
} from './Profile.styled';

function Profile() {
  return (
    <ProfileBox>
      <ProfileImg>이미지</ProfileImg>
      <ProfileInfo>
        <ProfileName>
          <Nickname>닉네임</Nickname>
          <Button>등급버튼</Button>
        </ProfileName>
        <ProfileWarn>경고문</ProfileWarn>
      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;
