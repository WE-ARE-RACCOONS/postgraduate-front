'use client';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useSetAtom } from 'jotai';

function page() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['kakao_refreshToken']);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
      code: code
    }).then((res) => {
      const response = res.data.data;

      if(response.socialId) {
        router.replace(`/signin/${response.socialId}`);
        return;
      }

      if(response.accessToken) {
        // token 저장하는 로직
        router.replace('/');
        return;
      }

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
