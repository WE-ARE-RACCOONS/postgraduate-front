
"use client";
import React from 'react'
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
export const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";

export const REST_API_KEY = '600f92747c92f81892156a8f1e40bfea';
function page() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        // console.log(process.env.REACT_APP_URL);
        console.log(code);
        console.log(REST_API_KEY);
        console.log(REDIRECT_URI);

        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("client_id", REST_API_KEY);
        params.append("redirect_uri", REDIRECT_URI);
        params.append("code", code);

        // https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}
        fetch(`https://kauth.kakao.com/oauth/token`,{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },

              body: params,
          })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;
            console.log(data)
            console.log(accessToken);
            // 이제 액세스 토큰을 사용하여 카카오 API에 요청하여 사용자 정보를 가져올 수 있음
          })
          .catch(error => {
            console.error('액세스 토큰 요청 실패:', error);
          });
    
          // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
          router.push('/');
      }, []);

  return (
    <div>
      로그인 중입니다.
    </div>
  )
}

export default page



