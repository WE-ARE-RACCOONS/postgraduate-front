'use client';
import React from 'react';
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
import user_icon from '../../../public/user.png';

function Profile(props: ProfileProps) {
  return (
    <ProfileBox>
      <ImageBox>
        <Image
          src={props.profile || user_icon}
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
        {/* {props.userType == 'senior' &&
          !(props.certifiReg === 'APPROVE' && props.profileReg) && (
            <div
              style={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '3.5rem',
              }}
            >
              <Image
                src={warn}
                alt="warn"
                width={16}
                height={16}
                style={{ marginRight: '0.25rem' }}
              />
              <button
                onClick={suggestModal}
                id="warn-msg"
                style={{ border: 'none', backgroundColor: 'white' }}
              >
                멘토링 진행불가
              </button>
            </div>
          )} */}
      </ProfileInfo>
    </ProfileBox>
  );
}

export default Profile;
