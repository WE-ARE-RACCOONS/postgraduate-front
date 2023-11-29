'use client';
import Profile from '@/components/Profile';
import ProfileManage from '@/components/Profile/ProfileManage';
import CustomerCenter from '@/components/Profile/ProfileStateChange/CustomerCenter';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

function page() {
  const [nickName, setnickName] = useState<string | null>(null);
  const [profile, setprofile] = useState<string | null>(null);
  const { getAccessToken } = useAuth();
  useEffect(() => {
    if (getAccessToken()) {
      const Token = getAccessToken();
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
      <Profile
        profile={profile ? profile : ''}
        nickName={nickName ? nickName : ''}
      />
      <ProfileManage />
      <CustomerCenter />
    </div>
  );
}

export default page;
