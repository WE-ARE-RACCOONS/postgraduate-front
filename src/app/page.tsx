'use client';
import Login from '@/components/kakao/login';
import ServiceCondition from '@/components/Termsofservice/serviceCondition';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  KakaoAccessProvider,
  useKakaoAccess,
} from '../context/KakaoAccessProvider';
import {
  SeverAccessProvider,
  useSeverAccess,
} from '@/context/SeverAccessProvider';
import { essential } from '@/stores/condition';

export default function Home() {
  const [kakaoToken, setKakaoToken] = useState<string | null>(null);
  const { kakaoAccess } = useKakaoAccess();
  const { setSeverAccess } = useSeverAccess();
  useEffect(() => {
    setKakaoToken(kakaoAccess);
  }, []);

  useEffect(() => {
    if (kakaoToken) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
          accessToken: kakaoToken,
        })
        .then((data) => {
          const code = data.data.code;
          if (code === 200) {
            const accessToken = data.data.data.accessToken;
            const refreshToken = data.data.data.refreshToken;
            setSeverAccess(accessToken);
          } else if (code === 404) {
            const socialId = data.data.data.socialId;
            console.log(socialId);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [kakaoToken]);

  return (
    <SeverAccessProvider>
      기본 루트 페이지 입니다
      <Login />
      <ServiceCondition />
    </SeverAccessProvider>
  );
}
