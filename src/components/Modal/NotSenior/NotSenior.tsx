import { NotSeniorProps } from '@/types/modal/mypage';
import React from 'react';
import x_icon from '../../../../public/x.png';
import Image from 'next/image';
import Router, { useRouter } from 'next/navigation';
import {NotSeniorBoxTop,
     NotSeniorMid,
     NotSeniorBottom} from './NotSenior.styled'
import { useAtomValue } from 'jotai';
import { socialIdAtom } from '@/stores/signup';
function NotSenior(props: NotSeniorProps) {
    const socialId = useAtomValue(socialIdAtom);
    const xClick = () => {
        props.modalHandler();
      };
      const router = useRouter();
      const SeniorJoin = () => {
        router.push(`/signup${socialId}`)
      };
      console.log(socialId)
  return (
<div>
    <NotSeniorBoxTop>
    <Image
        id="x-icon"
        src={x_icon}
        alt="닫기 버튼"
        sizes="(max-width: 600px) 2.rem"
        priority
        onClick={xClick}
        style={{ width: '2rem', height: '2rem' }}
      />
    </NotSeniorBoxTop>
<NotSeniorMid>
  <div>아직 대학원 선배 회원이 아니에요</div>
  <p>대학원 선배로 가입이 필요해요</p>
    <p>가입 후, 멘토링을 진행 할 수 있어요</p>
    </NotSeniorMid>
    <NotSeniorBottom>
        <button onClick={SeniorJoin}>대학원 선배로 가입하기</button>
    </NotSeniorBottom>
</div>
  )
  }
export default NotSenior

