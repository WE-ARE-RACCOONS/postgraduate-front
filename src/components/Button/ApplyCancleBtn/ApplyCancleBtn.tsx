import { CancleBtnProps } from '@/types/button/applyCancleBtn'
import useModal from '@/hooks/useModal';
import React from 'react'
import axios from 'axios';
import { createPortal } from 'react-dom';
import MentoringCancel from '@/components/Mentoring/MentoringCancel/MentoringCancel';
export default function ApplyCancleBtn(props:CancleBtnProps) {
    const handleClick = () => {
        props.modalHandler();
        if (props.onClick) props.onClick();
      };
      const { modal, modalHandler, portalElement } = useModal('junior-mentoring-cancel');
  return (
    <div  onClick={() => {
        handleClick();
      }}
    >
      <div>{props.btnText}</div>
    
    {modal && portalElement
        ? createPortal(
            <MentoringCancel mentoringId = {props.mentoringId} modalHandler={modalHandler} />,
            portalElement,
          )
        : null}
        </div>
  )
}
