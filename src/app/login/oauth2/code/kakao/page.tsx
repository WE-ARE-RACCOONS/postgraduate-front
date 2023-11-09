'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function page() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['kakao_refreshToken']);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
      code: code
    }).then((res) => {
      console.log(res.data.data);
      router.replace('/');
    }).catch((err) => {
      console.error(err);
    })
    
  }, []);

  return (
    <div>
      로그인 중입니다.
    </div>
  )
}

export default page;
