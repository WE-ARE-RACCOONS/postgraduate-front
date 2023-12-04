'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

function Login() {
  const { getAccessToken } = useAuth();
  const [Token, setToken] = useState<string | null | undefined>('');
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  useEffect(() => {
    setToken(getAccessToken());
  }, []);

  return (
    <div>
      {Token ? (<></>) : (
        <button type="button" onClick={loginHandler}>로그인 하기</button>
      )}
    </div>
  );
}

export default Login;
