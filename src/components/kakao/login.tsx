'use client';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

function Login() {
  const { getAccessToken } = useAuth();
  const [token, setToken] = useState<string | null | undefined>('');
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  useEffect(() => {
    setToken(getAccessToken());
  }, [token]);

  return (
    <div>
      {/* {token ? (
        <></>
       ) : (
        <button type="button" onClick={loginHandler}>
        로그인 하기
      </button>
       )} */}
      <button
        type="button"
        onClick={loginHandler}
        style={{
          padding: '10px 16px',
          fontSize: '0.9rem',
          backgroundColor: '#2FC4B2',
          color: '#fff',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          border: 'none',
          marginLeft: '0.75rem',
        }}
      >
        로그인
      </button>
    </div>
  );
}

export default Login;
