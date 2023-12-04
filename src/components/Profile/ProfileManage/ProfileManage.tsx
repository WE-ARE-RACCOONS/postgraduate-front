import React from 'react';
import { ProfileManageBox } from './ProfileManage.styled';
import { userType } from '@/types/user/user';
import JuniorManage from './JuniorManage';
import SeniorManage from './SeniorManage';

function ProfileManage({ userType } : { userType: userType }) {

  return (
    <ProfileManageBox>
      {userType == 'junior' && (
        <JuniorManage />
      )}
      {userType == 'senior' && (
        <SeniorManage />
      )}
    </ProfileManageBox>
  );
}

export default ProfileManage;
