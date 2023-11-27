import { CancleBtnProps } from '@/types/button/applyCancleBtn'
import React from 'react'

export default function ApplyCancleBtn(props:CancleBtnProps) {
    const handleClick = () => {
        props.modalHandler();
        if (props.onClick) props.onClick();
      };
  return (
    <div>
      
    </div>
  )
}
