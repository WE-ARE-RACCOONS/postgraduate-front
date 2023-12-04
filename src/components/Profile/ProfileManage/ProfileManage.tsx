import React from 'react';
import { ProfileManageBox } from './ProfileManage.styled';
import JuniorManage from './JuniorManage';
import SeniorManage from './SeniorManage';
import { ProfileManageProps } from '@/types/profile/profile';

function ProfileManage(props: ProfileManageProps) {
  return (
    <ProfileManageBox>
      {props.userType == 'junior' && <JuniorManage />}
      {props.userType == 'senior' && (
        <SeniorManage
          certifiReg={props.certifiReg}
          profileReg={props.profileReg}
        />
      )}
    </ProfileManageBox>
  );
}

export default ProfileManage;
