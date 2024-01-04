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
  ImageBox,
} from './Profile.styled';
import { ProfileProps } from '@/types/profile/profile';
import SingleValidator from '../Validator/SingleValidator';

function Profile(props: ProfileProps) {
  const profile = props.profile;
  return (
    <ProfileBox>
      <ImageBox>
        <Image
          src={profile}
          alt="profile image"
          width={52}
          height={52}
          style={{ borderRadius: '90%' }}
        />
      </ImageBox>
      <ProfileInfo>
        <ProfileName>
          <ProfileNickname>{props.nickName}</ProfileNickname>
          <ProfileButton>
            {props.userType == 'junior' ? '후배 회원' : '선배 회원'}
          </ProfileButton>
        </ProfileName>
        {!props.profileReg ||
          (props.certifiReg !== 'APPROVE' && (
            <SingleValidator
              textColor="#FF0000"
              msg="아직 멘토링을 진행할 수 없어요"
            />
          ))}
      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;
