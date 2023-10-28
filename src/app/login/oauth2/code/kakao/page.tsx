
"use client";
import React from 'react'
import { useEffect ,useState} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAccessToken } from '@/context/context';
import { useCookies } from 'react-cookie';

function page() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    const pathname = usePathname();
    const router = useRouter();
    const { provideAccessToken } = useAccessToken();
    const [cookies, setCookie] = useCookies(['kakao_refreshToken']);
    const [loginSuccess, setLoginSuccess] = useState(false);
  
    useEffect(() => {

        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("client_id", process.env.NEXT_PUBLIC_REST_API_KEY);
        params.append("redirect_uri", process.env.NEXT_PUBLIC_REDIRECT_URI);
        params.append("code", code);

        fetch(`https://kauth.kakao.com/oauth/token`,{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },

              body: params,
          })
        .then(response => response.json())
        .then(data => {
            const kakao_accessToken = data.access_token;
            const kakao_refreshToken = data.refresh_token;
            console.log(data.refresh_token)
            setCookie('kakao_refreshToken', kakao_refreshToken, { path: '/' });

            localStorage.setItem('kakao_access_token', kakao_accessToken);
            router.replace('/');
            
          })
          .catch(error => {
            console.error('액세스 토큰 요청 실패:', error);
          });
          
        
      }, []);

  return (
    <div>
      로그인 중입니다.
    </div>
  )
}

export default page



