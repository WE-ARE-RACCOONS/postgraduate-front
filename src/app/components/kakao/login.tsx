'use client'
import React from 'react'
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI

function Login() {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const loginHandler = () => {
    window.location.href = link
  }

  return (
    <div>
      카카오 로그인 입니다
      <button type="button" onClick={loginHandler}>
        로그인 하기
      </button>
    </div>
  )
}

export default Login
