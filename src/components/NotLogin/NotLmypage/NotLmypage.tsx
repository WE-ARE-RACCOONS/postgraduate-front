import { NotLoginProps } from '@/types/modal/menubar';
import React from 'react';

function NotLmypage(props: NotLoginProps) {
  const handleClick = () => {
    props.modalHandler();
  };
  return (
    <div
      onClick={() => {
        handleClick();
      }}
    >
      <div id="NLogin-guide-msg">로그인 및 회원가입</div>
      <div id="NLogin-guide-msg">
        3초만에 가입하고 대학원 김선배를 시작하세요
      </div>
    </div>
  );
}

export default NotLmypage;
