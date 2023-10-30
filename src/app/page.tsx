'use client'
import Login from '@/app/components/kakao/login'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [kakaoToken, setKakaoToken] = useState<string | null>(null)

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('kakao_access_token')
    setKakaoToken(tokenFromLocalStorage)
  }, [])

  useEffect(() => {
    if (kakaoToken) {
      axios
        .post('/user/token', {
          kakaoToken,
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [kakaoToken])

  return (
    <div>
      기본 루트 페이지 입니다
      <Login />
    </div>
  )
}
