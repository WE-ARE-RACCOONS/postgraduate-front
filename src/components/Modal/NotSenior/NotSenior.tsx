'use client';
import { NotSeniorProps } from '@/types/modal/mypage';
import React, { useState } from 'react';
import x_icon from '../../../../public/x.png';
import Image from 'next/image';
import Router, { useRouter } from 'next/navigation';
import { SENIOR_MODAL } from '@/constants/form/notSeniorForm';
import { sAbleTime } from '@/stores/senior';
import {
  NotSeniorBoxTop,
  NotSeniorMid,
  NotSeniorBottom,
  NSMain,
  NSSub,
  NSBtn,
} from './NotSenior.styled';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { socialIdAtom, userTypeAtom } from '@/stores/signup';
import { userType } from '@/types/user/user';
function NotSenior(props: NotSeniorProps) {
  const socialId = useAtomValue(socialIdAtom);
  const [userType, setUserType] = useAtom(userTypeAtom);

  const xClick = () => {
    props.modalHandler();
  };
  const router = useRouter();
  const seniorJoin = () => {
    router.push(`/signup/${socialId}/common-info/auth`);
  };
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
          style={{
            width: '2.3rem',
            height: '2.3rem',
            margin: '1rem',
            color: '#CBCFDB',
          }}
        />
      </NotSeniorBoxTop>
      <NotSeniorMid>
        <NSMain>{SENIOR_MODAL.notSeniorUser}</NSMain>
        <NSSub>{SENIOR_MODAL.needSeniorUserJoin}</NSSub>
        <NSSub>{SENIOR_MODAL.recommendJoin}</NSSub>
      </NotSeniorMid>
      <NotSeniorBottom>
        <NSBtn onClick={seniorJoin}>대학원 선배로 가입하기</NSBtn>
      </NotSeniorBottom>
    </div>
  );
}
export default NotSenior;
