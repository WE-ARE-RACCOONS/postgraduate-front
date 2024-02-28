import React from 'react';
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import LoginReq from '../../../../public/LoginReq.png';
import kakao from '../../../../public/kakao.png';
import logo from '../../../../public/logo.png';
import {
  MyLoginRequestBox,
  Logo,
  MLBoxTop,
  MLBoxMiddle,
  MLBoxBottom,
} from './MyLoginRequest.styled';
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;

function MyLoginRequest({ modalHandler }: { modalHandler: () => void }) {
  const handleClick = () => {
    modalHandler();
    if (typeof window !== undefined) {
      const REDIRECT_URI = window.location.href + 'login/oauth2/code/kakao';
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      window.location.href = link;
    }
  };
  return (
    <MyLoginRequestBox>
      <MLBoxTop>
        <Logo>
          <Image
            id="logo"
            src={logo}
            alt="로고"
            width={36}
            height={24}
            priority
            onClick={handleClick}
            style={{ marginRight: '0.13rem' }}
          />
          <div className="none-name">대학원</div>
          <div className="bold-name">김선배</div>
        </Logo>
        <Image
          id="x-icon"
          src={x_icon}
          alt="닫기 버튼"
          sizes="(max-width: 600px) 3.rem"
          width={36}
          height={36}
          priority
          onClick={modalHandler}
        />
      </MLBoxTop>
      <MLBoxMiddle>
        <Image
          id="LoginReq"
          src={LoginReq}
          alt="로그인 중간 사진"
          sizes="(max-width: 600px) 3.rem"
          priority
          onClick={modalHandler}
        />
      </MLBoxMiddle>
      <MLBoxBottom>
        <div id="mylogin-req-msg">안녕하세요, </div>
        <div id="mylogin-req-msg">예비대학원생들을 위한 맞춤 멘토링</div>
        <div id="mylogin-req-msg-large">
          <div id="mylogin-req-msg-bold">대학원 김선배</div>입니다
        </div>

        <div id="mylogin-req-msg-small">
          <div id="mylogin-req-msg-color">
            진학고민,연구실꿀팁, 대학원생활이야기
          </div>
          까지
        </div>
        <div id="mylogin-req-msg-small">
          당신의 고민을 해결해드릴 멘토를 찾아드릴게요!
        </div>
      </MLBoxBottom>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          id="kakao"
          src={kakao}
          alt="카카오톡"
          sizes="(max-width: 600px) 3.rem"
          width={317}
          priority
          style={{ marginTop: '3rem' }}
          onClick={handleClick}
        />
      </div>
    </MyLoginRequestBox>
  );
}

export default MyLoginRequest;
