"use client";
import Login from '@/kakao/login'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useAccessToken } from '@/context/context';
import { AccessTokenProvider } from '@/context/context';

export default function Home() {

   const [kakaoToken, setKakaoToken] = useState(localStorage.getItem('token'));
  //const { accessToken } = useAccessToken();
  //console.log('찐토큰',accessToken)


  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    setKakaoToken(tokenFromLocalStorage);

    // 값이 변경될 때 실행되는 동작을 정의
    console.log(tokenFromLocalStorage);

  }, [kakaoToken]);
  


  useEffect(() => {
    axios.post('/user/token',
    {
      kakaoToken
      //로컬스토리지에 저장한 토큰 값
    })
    
      .then(function (response) {
        console.log(response.data);
        // jwt토큰 받은거 저장  -> context api로 저장해야함
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //console.log(accessToken)
  return (

    <div>
      <AccessTokenProvider>
        기본 루트 페이지 입니다
        <Login/>
      </AccessTokenProvider>
    </div>
  )
}
