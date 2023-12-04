'use client';
import Profile from '@/components/Profile';
import ProfileManage from '@/components/Profile/ProfileManage';
import CustomerCenter from '@/components/Profile/ProfileStateChange/CustomerCenter';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import NotLmypage from '@/components/NotLogin/NotLmypage/NotLmypage';
import useModal from '@/hooks/useModal';
import { createPortal } from 'react-dom';
import FullModal from '@/components/Modal/FullModal';
import DimmedModal from '@/components/Modal/DimmedModal';
function page() {
  const [nickName, setnickName] = useState<string | null>(null);
  const [profile, setprofile] = useState<string | null>(null);
  const { modal, modalHandler, portalElement } = useModal(
    'login-request-full-portal',
  );
  const {
    modal: seniorChangemodal,
    modalHandler: seiorChangemodalHandler,
    portalElement: seniorChangePortalElement,
  } = useModal('senior-request-portal');
  const { getAccessToken } = useAuth();
  const Token = getAccessToken();

  useEffect(() => {
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
  }, []);

  return (
    <div>
      {Token ? (
        <div>
          <Profile
            profile={profile ? profile : ''}
            nickName={nickName ? nickName : ''}
          />
          <ProfileManage modalHandler={seiorChangemodalHandler} />
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
      {seniorChangemodal && seniorChangePortalElement
        ? createPortal(
            <DimmedModal
              modalType="notSenior"
              modalHandler={seiorChangemodalHandler}
            />,
            seniorChangePortalElement,
          )
        : ''}
    </div>
  );
}

export default page;
