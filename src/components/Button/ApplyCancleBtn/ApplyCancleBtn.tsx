'use client';
import { CancleBtnProps } from '@/types/button/applyCancleBtn';
import React from 'react';
import { ApplyCancleBtnStyle, ACsenior } from './ApplyCancleBtn.styled';
export default function ApplyCancleBtn(props: CancleBtnProps) {
  const handleClick = () => {
    if (props.cancelModalHandler) props.cancelModalHandler();
    if (props.modalHandler) props.modalHandler();
    if (props.onClick) props.onClick();
  };
  return (
    <>
      {props.kind == 'spec' && (
        <ACsenior
          onClick={() => {
            handleClick();
          }}
        >
          {props.btnText}
        </ACsenior>
      )}
      {props.kind == 'jcancel' && (
        <ApplyCancleBtnStyle
          onClick={() => {
            handleClick();
          }}
        >
          {props.btnText}
        </ApplyCancleBtnStyle>
      )}
    </>
  );
}
