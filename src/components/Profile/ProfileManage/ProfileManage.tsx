import React, { useState, useEffect } from 'react';
import { ProfileManageBox } from './ProfileManage.styled';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ContentComponent from '../Box/ContentBox/ContentBox';
import TitleComponent from '../Box/TitleBox/TitleBox';
import { NotSeniorProps } from '@/types/modal/mypage';
import useAuth from '@/hooks/useAuth';
function ProfileManage(props: NotSeniorProps) {
  const router = useRouter();
  const [code, setCode] = useState();
  const handleProfileEditClick = () => {
    router.push('/mypage/edit');
  };

  const { getAccessToken } = useAuth();

  const handleClick = async () => {
    try {
      const Token = getAccessToken();
      if (Token) {
        const headers = {
          Authorization: `Bearer ${Token}`,
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me/role`,
          { headers },
        );
        if (response.data.data === true) {
          //여기 대학원다시 마이페이지 로드
        }
        if (response.data.data === false) {
          props.modalHandler();
        }
      }
    } catch (error) {
      console.error('Error fetching data from the server:', error);
    }
  };

  return (
    <ProfileManageBox>
      <TitleComponent title="회원 상태 변경" />
      <ContentComponent
        content="내 정보 수정"
        onClick={handleProfileEditClick}
      />
      <ContentComponent
        content="대학원선배 회원으로 변경"
        onClick={handleClick}
      />
    </ProfileManageBox>
  );
}

export default ProfileManage;
