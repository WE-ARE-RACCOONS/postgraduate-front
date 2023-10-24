"use client";
import Login from '@/kakao/login'
import axios from 'axios'
import { useEffect } from 'react'
export default function Home() {

  useEffect(() => {
    axios.post('/user/token',
    {
      //토큰 넘겨주는 자리
    })
      .then(function (response) {
        console.log(response.data);
        // jwt토큰 받은거 저장  -> 이게 리프레시 인가?( 어디에?)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (

    <div>
      기본 루트 페이지 입니다
      <Login />
    </div>
  )
}
