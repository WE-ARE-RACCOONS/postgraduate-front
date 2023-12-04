import React, { useState, useEffect } from 'react';
import { ProfileManageBox } from './ProfileManage.styled';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ContentComponent from '../Box/ContentBox/ContentBox';
import TitleComponent from '../Box/TitleBox/TitleBox';
import { NotSeniorProps } from '@/types/modal/mypage';
import useAuth from '@/hooks/useAuth';
import { useAtom } from 'jotai';
import { socialIdAtom } from '@/stores/signup';
import JuniorManage from './JuniorManage';
import SeniorManage from './SeniorManage';
import { ProfileManageProps } from '@/types/profile/profile';
function ProfileManage(props: ProfileManageProps) {

  return (
    <ProfileManageBox>
    {props.userType == 'junior' && <JuniorManage modalHandler={props.modalHandler} />}
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
