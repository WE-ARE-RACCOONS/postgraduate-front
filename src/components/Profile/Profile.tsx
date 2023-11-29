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

function Profile({ profile, nickName }: { profile: string; nickName: string }) {
  return (
    <ProfileBox>
      <Image src={'/user.png'} alt="profile image" width={32} height={32} />
      <ProfileInfo>
        <ProfileName>
          <ProfileNickname>{nickName}</ProfileNickname>
          <ProfileButton>후배회원</ProfileButton>
        </ProfileName>
      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;