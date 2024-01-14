'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import warn  from '../../../public/warn.png'
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
          {props.certifiReg !== 'APPROVE' && (
            <div style={{display:'flex',textAlign:'center',justifyContent:'center',alignItems:'center', marginLeft:'3.5rem'}}>
            <Image 
            src={warn}
            alt='warn'
            width={16}
            height={16}
            />
            <div id ='warn-msg'>멘토링 진행불가</div>
            </div>
          )}

      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;
