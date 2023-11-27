import React from 'react'
import { ModalMentoringProps } from '@/types/modal/mentoringDetail'
import {MentoringCancelBox,
    CancelBtn,
    NoCancelBtn
} from './MentoringCancel.styled';

function MentoringCancel(props: ModalMentoringProps) {
    const handleClick = () => {
        props.modalHandler();
        if (props.onClick) props.onClick();
      };
  return (
    <MentoringCancelBox>
        멘토링 신청을 취소하시겠어요?
        <CancelBtn>취소</CancelBtn>
        <NoCancelBtn onClick={() => {
        handleClick();
      }}>아니요</NoCancelBtn>
    </MentoringCancelBox>
  )
}

export default MentoringCancel
