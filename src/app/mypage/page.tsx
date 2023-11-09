'use client';
import Point from '@/components/Profile/Point/Point';
import Profile from '@/components/Profile/Profile';
import ProfileManage from '@/components/Profile/ProfileManage';
import ProfileStateChange from '@/components/Profile/ProfileStateChange/ProfileStateChange';
import React from 'react';

function page() {
  return (
    <div>
      <Profile />
      <Point />
      <ProfileManage />
      <ProfileStateChange />
    </div>
  );
}

export default page;
