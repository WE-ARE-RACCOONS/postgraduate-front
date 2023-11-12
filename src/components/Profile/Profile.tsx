'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import {
  ProfileBox,
  ProfileInfo,
  ProfileName,
  ProfileNickname,
  ProfileButton,
  ProfileWarn,
} from './Profile.styled';

function Profile({
  profile,
  nickName,
}: {
  profile: string;
  nickName: string;
}) {
  return (
    <ProfileBox>
      <Image 
        src={profile} 
        alt="image" 
        width={32}height={32}
        />
      <ProfileInfo>
        <ProfileName>
          <ProfileNickname>{nickName}</ProfileNickname>
          <ProfileButton>등급버튼</ProfileButton>
        </ProfileName>
        <ProfileWarn>경고문</ProfileWarn>
      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;
