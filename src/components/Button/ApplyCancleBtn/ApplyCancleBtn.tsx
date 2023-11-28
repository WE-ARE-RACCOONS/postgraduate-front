'use client';
import { CancleBtnProps } from '@/types/button/applyCancleBtn';
import useModal from '@/hooks/useModal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function ApplyCancleBtn(props: CancleBtnProps) {
  const handleClick = () => {
    props.cancelModalHandler();
    props.modalHandler();
    if (props.onClick) props.onClick();
  };
  return (
    <div
      onClick={() => {
        handleClick();
      }}
    >
      <div>{props.btnText}</div>
    </div>
  );
}
