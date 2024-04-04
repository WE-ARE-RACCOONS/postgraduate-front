'use client';
import { NotSeniorProps } from '@/types/modal/mypage';
import React, { useState } from 'react';
import x_icon from '../../../../public/x_gray.png';
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
  NotSeniorContainer,
} from './NotSenior.styled';
import { useAtom } from 'jotai';
import { userTypeAtom } from '@/stores/signup';

function NotSenior(props: NotSeniorProps) {
  const xClick = () => {
    props.modalHandler();
  };

  const router = useRouter();
  const seniorJoin = () => {
    router.push(`/signup/select/common-info/auth`);
  };
  
  return (
    <NotSeniorContainer>
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
            cursor: 'pointer',
          }}
        />
      </NotSeniorBoxTop>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <NotSeniorMid>
          <NSMain>{SENIOR_MODAL.notSeniorUser}</NSMain>
          <div
            style={{
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
              marginLeft: '1rem',
            }}
          >
            <NSSub>{SENIOR_MODAL.needSeniorUserJoin}</NSSub>
            <NSSub>{SENIOR_MODAL.recommendJoin}</NSSub>
          </div>
        </NotSeniorMid>
      </div>
      <NotSeniorBottom>
        <NSBtn onClick={seniorJoin}>대학원 선배로 가입하기</NSBtn>
      </NotSeniorBottom>
    </NotSeniorContainer>
  );
}
export default NotSenior;
