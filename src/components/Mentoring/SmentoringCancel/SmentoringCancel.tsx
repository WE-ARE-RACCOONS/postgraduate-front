'use client';
import { ModalMentoringProps } from '@/types/modal/mentoringDetail';
import React, { useEffect, useState } from 'react';
import {
  SMCancelTop,
  SMCancelMid,
  SMCBtn,
  SModalMentoringBackground,
  SMCBgContainer,
  SMCBtnEtc,
  SMCbtnCancelT,
  SMCbtnCancelF,
} from './SmentoringCancel.styled';
import x_icon from '../../../../public/x.png';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import { SENIOR_MENTOR_CANCEL } from '@/constants/form/sMentoCanelForm';
import CheckBox from '@/components/Checkbox';
import { useAtom } from 'jotai';
import { SCEtc, noTime, notKnow } from '@/stores/condition';
function SmentoringCancel(props: ModalMentoringProps) {
  const { getAccessToken } = useAuth();
  const [reason, setReason] = useState('');
  const [time, setTime] = useAtom(noTime);
  const [know, setKnow] = useAtom(notKnow);
  const [etc, setEtc] = useAtom(SCEtc);
  const flag = time || know || etc;
  const xClick = () => {
    props.modalHandler();
  };
  const cancelMentoring = async () => {
    try {
      const Token = getAccessToken();

      getAccessToken().then(async (Token) => {
        if(Token) {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          };
    
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/senior/me/${props.mentoringId}/refuse`,
            {
              method: 'PATCH',
              headers,
              body: JSON.stringify({
                reason: reason,
              }),
            },
          );
          // const responseData = await response.json();
          props.modalHandler();
        }
      });
    } catch (error) {
      console.error('Error cancelling mentoring:', error);
    }
  };
  return (
    <SMCBgContainer>
      <SModalMentoringBackground>
        <Image
          id="x-icon"
          src={x_icon}
          alt="닫기 버튼"
          sizes="(max-width: 600px) 2.rem"
          priority
          onClick={xClick}
          style={{
            width: '2rem',
            height: '2rem',
            marginLeft: '17.7rem',
            marginTop: '0.5rem',
          }}
        />
        <SMCancelTop>
          <h3>{SENIOR_MENTOR_CANCEL.whyRefuse}</h3>
          <div id="refusewarn">{SENIOR_MENTOR_CANCEL.refuseWarn}</div>
        </SMCancelTop>
        <SMCancelMid>
          <SMCBtn onClick={(e) => setReason(e.currentTarget.textContent ?? '')}>
            <CheckBox type="cancel" checked={time} onChange={setTime} />
            {SENIOR_MENTOR_CANCEL.haveSchedul}
          </SMCBtn>
          <SMCBtn onClick={(e) => setReason(e.currentTarget.textContent ?? '')}>
            <CheckBox type="cancel" checked={know} onChange={setKnow} />
            {SENIOR_MENTOR_CANCEL.dontKnow}
          </SMCBtn>
          <SMCBtnEtc>
            <div style={{ display: 'flex' }}>
              <CheckBox type="cancel" checked={etc} onChange={setEtc} />
              기타
            </div>
            <div style={{ display: 'flex' }}>
              <input
                style={{
                  border: 'none',
                  fontWeight: '400',
                  height: '2rem',
                  width: '20rem',
                  backgroundColor: ' #F8F9FA',
                }}
                type="text"
                placeholder={SENIOR_MENTOR_CANCEL.other}
                onChange={(e) => setReason(e.target.value)}
              ></input>
            </div>
          </SMCBtnEtc>
        </SMCancelMid>
        <div style={{ marginLeft: '1.45rem', marginTop: '3.5rem' }}>
          {flag ? (
            <SMCbtnCancelT onClick={cancelMentoring}>거절하기</SMCbtnCancelT>
          ) : (
            <SMCbtnCancelF>거절하기</SMCbtnCancelF>
          )}
        </div>
      </SModalMentoringBackground>
    </SMCBgContainer>
  );
}

export default SmentoringCancel;
