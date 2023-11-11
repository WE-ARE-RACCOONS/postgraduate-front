'use Client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Point from '../Point/Point';

import {
  ProfileBox,
  ProfileImg,
  ProfileInfo,
  ProfileName,
  ProfileNickname,
  ProfileButton,
  ProfileWarn,
} from './Profile.styled';

function Profile({
  profile,
  nickNamese,
}: {
  profile: string;
  nickNamese: string;
}) {
  return (
    <ProfileBox>
      <ProfileImg src={profile} alt="이미지"></ProfileImg>
      <ProfileInfo>
        <ProfileName>
          <ProfileNickname>{nickNamese}</ProfileNickname>
          <ProfileButton>등급버튼</ProfileButton>
        </ProfileName>
        <ProfileWarn>경고문</ProfileWarn>
      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;
