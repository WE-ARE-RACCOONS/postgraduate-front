'use client';
import React from 'react'

function Login() {
    const REST_API_KEY = '600f92747c92f81892156a8f1e40bfea';
    const REDIRECT_URI = 'http://localhost:3000/login/oauth2/code/kakao';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const loginHandler = () => {
      window.location.href = link;
    };

  return (
    <div>
      카카오 로그인 입니다
      <button type='button' onClick={loginHandler}>
        로그인 하기
      </button>
    </div>
  )
}

export default Login
