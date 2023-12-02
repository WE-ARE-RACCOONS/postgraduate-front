import React from 'react'
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import LoginReq from '../../../../public/LoginReq.png';
import {MyLoginRequestBox,
    Logo,
    MLBoxTop,
    MLBoxMiddle
} from './MyLoginRequest.styled'
function MyLoginRequest({ modalHandler }: { modalHandler: () => void }) {
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
    </MyLoginRequestBox>
  )
}

export default MyLoginRequest
