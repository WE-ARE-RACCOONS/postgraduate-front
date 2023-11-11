'use client';
import Point from '@/components/Profile/Point/Point';
import Profile from '@/components/Profile/Profile';
import ProfileManage from '@/components/Profile/ProfileManage';
import ProfileStateChange from '@/components/Profile/ProfileStateChange/ProfileStateChange';
import React,{useEffect,useState}from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

function page() {

   //jotai로 할까 생각중
   const [nickNamese, setnickNamese] = useState<string | null>(null);
   const [profile, setprofile] = useState<string | null>(null);
   const { getAccessToken } = useAuth();
  
    useEffect(() => {
      if(getAccessToken()) {

      const Token = getAccessToken();
      const headers = {
        Authorization:`Bearer ${Token}`
      }
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`,{headers})
        .then((data) => {
          console.log(data.data.data);
          setnickNamese(data.data.data.nickName)
          console.log(data.data.data.nickName)
          setprofile(data.data.data.profile)
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        console.log("토큰이 없어요")
       }
  });
   
  return (
    <div>
      <Profile profile={profile!} nickNamese ={nickNamese!}/>
      <Point />
      <ProfileManage />
      <ProfileStateChange />
    </div>
  );
}

export default page;
