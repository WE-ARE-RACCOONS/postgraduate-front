import React from 'react';
import { ProfileManageBox } from './ProfileManage.styled';
import { userType } from '@/types/user/user';
import JuniorManage from './JuniorManage';

function ProfileManage({ userType } : { userType: userType }) {

  return (
    <ProfileManageBox>
      {userType == 'junior' && (
        <JuniorManage />
      )}
    </ProfileManageBox>
  );
}

export default ProfileManage;
