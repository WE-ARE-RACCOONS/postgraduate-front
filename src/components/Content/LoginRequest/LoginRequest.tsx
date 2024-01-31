import React from 'react';
import { loginRequestProps } from '@/types/content/loginRequest';
import ClickedBtn from '@/components/Button/ClickedBtn';
import {
  LoginRequestBox,
  LoginRequestBoxTop,
  LoginRequestBtn,
} from './LoginRequest.styled';
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;

function LoginRequest(props: loginRequestProps) {
  const handleClick = () => {
    props.modalHandler();
    if (typeof window !== undefined) {
      if (window.location.hostname.includes('localhost')) {
        const REDIRECT_URI = process.env.NEXT_PUBLIC_LOCAL_REDIRECT_URI;
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
      } else {
        const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
      }
    } else {
      const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      window.location.href = link;
    }
  };
  const xClick = () => {
    props.modalHandler();
  };
  return (
    <div>
      <LoginRequestBoxTop>
        <Image
          id="x-icon"
          src={x_icon}
          alt="닫기 버튼"
          sizes="(max-width: 600px) 2.rem"
          priority
          onClick={xClick}
          style={{
            width: '2.3rem',
            height: '2.3rem',
            margin: '1rem',
            color: '#CBCFDB',
            cursor: 'pointer'
          }}
        />
      </LoginRequestBoxTop>
      <LoginRequestBox>
        <div id="Login-guide-msg">
          내 멘토링은 로그인 후
          <br />
          이용가능합니다.
        </div>
        <div id="Login-guide-suggest">
          3초만에 로그인하고
          <br />
          나에게 맞는 멘토를 만나볼까요?
        </div>
        <LoginRequestBtn onClick={handleClick}>로그인하러가기</LoginRequestBtn>
      </LoginRequestBox>
    </div>
  );
}

export default LoginRequest;
