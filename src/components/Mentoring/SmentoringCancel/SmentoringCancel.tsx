'use client';
import { ModalMentoringProps } from '@/types/modal/mentoringDetail'
import React,{useEffect, useState} from 'react'
import {SMCancelTop, SMCancelMid} from './SmentoringCancel.styled'
import x_icon from '../../../../public/x.png';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import { SENIOR_MENTOR_CANCEL } from '@/constants/form/sMentoCanelForm';
function SmentoringCancel(props : ModalMentoringProps) {
    const { getAccessToken } = useAuth();
    const [reason, setReason] = useState('');
    const xClick = () => {
        props.modalHandler();
      };
      useEffect(() => {
        if (props.mentoringId !== 0) {
          cancelMentoring();
        }
      }, []);

      const cancelMentoring = async () => {
        try {
          const Token = getAccessToken();
          const headers = {
            Authorization: `Bearer ${Token}`,
          };
    
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/senior/me/${props.mentoringId}/refuse`,
            {
              method: 'PATCH',
              headers,
              body: JSON.stringify({
                mentoringId: props.mentoringId,
                reason:reason,
              }),
            },
          );
          const responseData = await response.json();
          console.log(responseData)
        } catch (error) {
          console.error('Error cancelling mentoring:', error);
        }
      };
  return (
    <div>
        <Image
          id="x-icon"
          src={x_icon}
          alt="닫기 버튼"
          sizes="(max-width: 600px) 2.rem"
          priority
          onClick={xClick}
          style={{ width: '2rem', height: '2rem' }}
        />
        <SMCancelTop>
            <div>
            {SENIOR_MENTOR_CANCEL.whyRefuse}
            </div>
            <div>
                {SENIOR_MENTOR_CANCEL.refuseWarn}
            </div>
        </SMCancelTop>
        <SMCancelMid>
            <button onClick={(e) => setReason(e.currentTarget.textContent??'')}>{SENIOR_MENTOR_CANCEL.haveSchedul}</button>
            <button onClick={(e) => setReason(e.currentTarget.textContent??'')}>{SENIOR_MENTOR_CANCEL.dontKnow}</button>
            <input type="text"
          placeholder={SENIOR_MENTOR_CANCEL.other}
          onChange={(e) => setReason(e.target.value)}></input>
        </SMCancelMid>
        <button onClick={cancelMentoring}>거절</button>
      
    </div>
  )
}

export default SmentoringCancel
