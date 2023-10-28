"use client";
import Login from '@/app/components/kakao/login'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useAccessToken } from '@/context/context';
import { AccessTokenProvider } from '@/context/context';

export default function Home() {

   const [kakaoToken, setKakaoToken] = useState(localStorage.getItem('kakao_access_token')); 


  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('kakao_access_token');
    setKakaoToken(tokenFromLocalStorage);

  }, [kakaoToken]);

  useEffect(() => {
    if (kakaoToken) { 
      axios.post('/user/token', {
        kakaoToken
      })
      .then(function (response) {
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [kakaoToken]);

  return (

    <div>
      <AccessTokenProvider>
        기본 루트 페이지 입니다
        <Login/>
      </AccessTokenProvider>
    </div>
  )
}
