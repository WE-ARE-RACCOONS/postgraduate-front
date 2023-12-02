import React from 'react'
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import LoginReq from '../../../../public/LoginReq.png';
import kakao from '../../../../public/kakao.png';
import {MyLoginRequestBox,
    Logo,
    MLBoxTop,
    MLBoxMiddle,
    MLBoxBottom
} from './MyLoginRequest.styled'
const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
function MyLoginRequest({ modalHandler }: { modalHandler: () => void }) {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleClick = () => {
    modalHandler();
    window.location.href = link;
  };
  return (
    <MyLoginRequestBox>
        <MLBoxTop>
        <Logo>로고자리</Logo>
        <Image
            id="x-icon"
            src={x_icon}
            alt="닫기 버튼"
            sizes="(max-width: 600px) 3.rem"
            priority
            onClick={modalHandler}
      />
      </MLBoxTop>
      <MLBoxMiddle>
      <Image
            id="LoginReq"
            src={LoginReq}
            alt="로그인 중간 사진"
            sizes="(max-width: 600px) 18.3.rem"
            priority
            onClick={modalHandler}
      />
      </MLBoxMiddle>
      <MLBoxBottom>
        <div>안녕하세요, </div>
        <div>예비대학원생들을 위한 맞춤 멘토링</div>
        <div>대학원 김선배 입니다</div>

        <div>진학고민,연구실꿀팁, 대학원생활이야기까지</div>
        <div>당신의 고민을 해결해드릴 멘토를 찾아드릴게요!</div>
      </MLBoxBottom>
      <Image
            id="kakao"
            src={kakao}
            alt="카카오톡"
            sizes="(max-width: 600px) 18.3.rem"
            priority
            onClick={handleClick}
      />

    </MyLoginRequestBox>
  )
}

export default MyLoginRequest
