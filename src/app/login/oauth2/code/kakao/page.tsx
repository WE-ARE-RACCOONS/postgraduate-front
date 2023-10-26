
"use client";
import React from 'react'
import { useEffect ,useState} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAccessToken } from '@/context/context';
import { useCookies } from 'react-cookie';

export const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
export const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;

function page() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    const pathname = usePathname();
    const router = useRouter();
    const { provideAccessToken } = useAccessToken();
    const [cookies, setCookie] = useCookies(['refreshToken']);
    const [loginSuccess, setLoginSuccess] = useState(false);
  
    useEffect(() => {
        // console.log(process.env.REACT_APP_URL);

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
            console.log(data)
            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;
            console.log('받은 토큰',accessToken);
            console.log('받은 리프레시 토큰',refreshToken);
            setCookie('refreshToken', refreshToken, { path: '/' });
            console.log({cookies})


            //리프레시 토큰 쿠키에 저장 -> const { refreshToken } = useCookies(['refreshToken']); 이런식으로 쓰면 됨
            //provideAccessToken(accessToken);


            localStorage.setItem('token', accessToken);
            router.replace('/');
          })
          .catch(error => {
            console.error('액세스 토큰 요청 실패:', error);
          });
          
          // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
      }, []);

  return (
    <div>
      로그인 중입니다.
    </div>
  )
}

export default page



