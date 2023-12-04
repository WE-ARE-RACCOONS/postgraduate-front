'use client';
import Profile from '@/components/Profile';
import ProfileManage from '@/components/Profile/ProfileManage';
import CustomerCenter from '@/components/Profile/ProfileStateChange/CustomerCenter';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/stores/user';
import NotLmypage from '@/components/NotLogin/NotLmypage/NotLmypage';
import useModal from '@/hooks/useModal';
import { createPortal } from 'react-dom';
import FullModal from '@/components/Modal/FullModal';

function MyPage() {
  const [nickName, setnickName] = useState<string | null>(null);
  const [profile, setprofile] = useState<string | null>(null);
  const { modal, modalHandler, portalElement } = useModal(
    'login-request-full-portal',
  );
  const { getAccessToken } = useAuth();
  const Token = useAtomValue(accessTokenAtom);

  useEffect(() => {
    async function getMyPage() {
      await getAccessToken();
      if (Token) {
        const headers = {
          Authorization: `Bearer ${Token}`,
        };
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, { headers })
          .then((data) => {
            setnickName(data.data.data.nickName);
            setprofile(data.data.data.profile);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
      }
    }

    getMyPage();
    
  }, [Token]);

  return (
    <div>
      {Token ? (
        <div>
          <Profile
            profile={profile ? profile : ''}
            nickName={nickName ? nickName : ''}
          />
          <ProfileManage />
        </div>
      ) : (
        <div>
          <NotLmypage modalHandler={modalHandler}></NotLmypage>
        </div>
      )}
      <CustomerCenter />
      {modal && portalElement
        ? createPortal(
            <FullModal modalType="login-request" modalHandler={modalHandler} />,
            portalElement,
          )
        : ''}
    </div>
  );
}

export default MyPage;
