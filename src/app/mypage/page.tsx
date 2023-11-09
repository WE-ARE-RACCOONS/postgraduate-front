'use client';
import Profile from '@/components/Profile/Profile'
import ProfileManage from '@/components/Profile/ProfileManage';
import ProfileStateChange from '@/components/Profile/ProfileStateChange/ProfileStateChange';
import React from 'react'

function page() {
  return (
    <div>
      <Profile/>
      <ProfileManage/>
      <ProfileStateChange/>
    </div>
  )
}

export default page
