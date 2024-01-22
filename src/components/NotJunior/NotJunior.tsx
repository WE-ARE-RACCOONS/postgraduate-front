'use client';
import { NotJuniorProps } from '@/types/modal/mypage';
import React, { useState } from 'react';
import x_icon from '../../../public/x_gray.png';
import Image from 'next/image';
import Router, { useRouter } from 'next/navigation';
import { JUNIOR_MODAL } from '@/constants/form/notSeniorForm';
import { sAbleTime } from '@/stores/senior';
import {
  NotSeniorBoxTop,
  NotSeniorMid,
  NotSeniorBottom,
  NSMain,
  NSSub,
  NSBtn,
} from './NotJunior.styled';
import { useAtom, useAtomValue } from 'jotai';
import { socialIdAtom, userTypeAtom } from '@/stores/signup';
function NotJunior(props: NotJuniorProps) {
  const socialId = useAtomValue(socialIdAtom);

  const xClick = () => {
    props.modalHandler();
  };
  const router = useRouter();
  const seniorJoin = () => {
    router.push(`/signup/${socialId}/common-info/matching-info`);
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
          width={21}
          height={21}
          style={{
            margin: '1rem',
            color: '#CBCFDB',
          }}
        />
      </NotSeniorBoxTop>
      <NotSeniorMid>
        <NSMain>{JUNIOR_MODAL.notJuniorUser}</NSMain>
        <div
          style={{
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
            marginLeft: '1rem',
          }}
        >
          <NSSub>{JUNIOR_MODAL.needJuniorUserJoin}</NSSub>
          <NSSub>{JUNIOR_MODAL.recommendJoin}</NSSub>
        </div>
      </NotSeniorMid>
      <NotSeniorBottom>
        <NSBtn onClick={seniorJoin}>대학원 선배로 가입하기</NSBtn>
      </NotSeniorBottom>
    </div>
  );
}
export default NotJunior;
