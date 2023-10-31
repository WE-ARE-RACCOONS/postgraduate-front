'use client'
import Login from '@/app/components/kakao/login'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { KakaoAccessProvider, useKakaoAccess } from './context/KakaoAccessProvider'
import { SeverAccessProvider, useSeverAccess } from '@/app/context/SeverAccessProvider'

export default function Home() {
  const [kakaoToken, setKakaoToken] = useState<string | null>(null)
  const { kakaoAccess } = useKakaoAccess();
  const { setSeverAccess } = useSeverAccess();

  useEffect(() => {
    setKakaoToken(kakaoAccess);
  }, [])

  useEffect(() => {
    if (kakaoToken) {
      axios
        .post(`http://3.39.42.200/user/login`, {
            accessToken: kakaoToken
        })
        .then((data) => {
          console.log(data)
          const accessToken = data.accessToken;
          const refreshToken = data.refreshToken;
          setSeverAccess(accessToken);
        })
        .catch(function (error) {
          
          console.log(error)
        })
    }
  }, [kakaoToken])

  return (
    <SeverAccessProvider>
      기본 루트 페이지 입니다
      <Login />
    </SeverAccessProvider>
  );
}
