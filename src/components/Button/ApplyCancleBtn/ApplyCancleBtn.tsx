'use client';
import { CancleBtnProps } from '@/types/button/applyCancleBtn';
import useModal from '@/hooks/useModal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApplyCancleBtnStyle, ACsenior } from './ApplyCancleBtn.styled';
export default function ApplyCancleBtn(props: CancleBtnProps) {
  const handleClick = () => {
    if (props.cancelModalHandler) props.cancelModalHandler();
    props.modalHandler();
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
