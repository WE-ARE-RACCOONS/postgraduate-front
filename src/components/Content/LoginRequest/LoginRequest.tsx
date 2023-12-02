import React from 'react';
import { loginRequestProps } from '@/types/content/loginRequest';
import ClickedBtn from '@/components/Button/ClickedBtn';
import { LoginRequestBox } from './LoginRequest.styled';
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

function LoginRequest(props: loginRequestProps) {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleClick = () => {
    props.modalHandler();
    window.location.href = link;
  };
  return (
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
      <ClickedBtn clickHandler={handleClick} btnText="로그인하러가기" />
    </LoginRequestBox>
  );
}

export default LoginRequest;
