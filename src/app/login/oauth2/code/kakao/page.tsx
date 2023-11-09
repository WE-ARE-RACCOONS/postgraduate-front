'use client';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { socialId } from '@/stores/user';

function page() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['kakao_refreshToken']);
  const setSocialId = useSetAtom(socialId);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
      code: code
    }).then((res) => {
      const response = res.data.data;

      if(response.socialId) {
        setSocialId(response.socialId);
        router.replace('/signin');
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
