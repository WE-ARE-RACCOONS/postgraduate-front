import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { ModalMentoringProps } from '@/types/modal/mentoringDetail';
import { SENIOR_MENTOR_CANCEL } from '@/constants/form/sMentoCanelForm';
import CheckBox from '@/components/Checkbox';
import { useAtom } from 'jotai';
import { SCEtc, SMCancelAtom, noTime, notKnow } from '@/stores/condition';
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
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

function SmentoringCancel(props: ModalMentoringProps) {
  const { getAccessToken } = useAuth();
  const [reason, setReason] = useState('');
  const [time, setTime] = useAtom(noTime);
  const [know, setKnow] = useAtom(notKnow);
  const [etc, setEtc] = useAtom(SCEtc);
  const [otherReason, setOtherReason] = useState(''); // '기타'의 경우 상세 이유
  const [flag, setFlag] = useState(false);
  const [SMCancel, setSMCancel] = useAtom(SMCancelAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const selected = time || know || etc;
  const [submittingText, setSubmittingText] = useState('');

  useEffect(() => {
    if (!selected) {
      setFlag(false);
      return;
    }

    if (reason) {
      if (reason === SENIOR_MENTOR_CANCEL.otherTitle && !otherReason) {
        setFlag(false);
        return;
      }
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [selected, reason, otherReason]);

  useEffect(() => {
    setSubmittingText(loading || isSubmitting ? '거절 중입니다...' : '거절하기');
  }, [loading, isSubmitting]);

  const xClick = () => {
    props.modalHandler();
  };

  const cancelMentoring = async () => {
    if (loading || isSubmitting) return;
    setLoading(true);
    setIsSubmitting(true);

    setTimeout(async () => {
      try {
        const Token = await getAccessToken();
        if (Token) {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          };

          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/senior/me/${props.mentoringId}/refuse`,
            {
              reason: reason === SENIOR_MENTOR_CANCEL.otherTitle ? otherReason : reason,
            },
            { headers }
          );
          setSMCancel(true);
          setLoading(false);
          setIsSubmitting(false);
          props.modalHandler();
          location.reload();
        }
      } catch (error) {
        console.error('Error cancelling mentoring:', error);
      }
    }, 1000);
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
              cursor: 'pointer',
            }}
          />
          {loading || isSubmitting ? (
        <div style={{ textAlign: 'center' }}>거절 중입니다...</div>
      ) : (
        <>
<SMCancelTop>
            <h3>{SENIOR_MENTOR_CANCEL.whyRefuse}</h3>
            <div id="refusewarn">{SENIOR_MENTOR_CANCEL.refuseWarn}</div>
          </SMCancelTop>
          <SMCancelMid>
            <SMCBtn
              className="reason-group"
              onClick={(e) => setReason(e.currentTarget.textContent ?? '')}
            >
              <CheckBox type="cancel" checked={time} onChange={setTime} />
              {SENIOR_MENTOR_CANCEL.haveSchedule}
            </SMCBtn>
            <SMCBtn
              className="reason-group"
              onClick={(e) => setReason(e.currentTarget.textContent ?? '')}
            >
              <CheckBox type="cancel" checked={know} onChange={setKnow} />
              {SENIOR_MENTOR_CANCEL.dontKnow}
            </SMCBtn>
            <SMCBtnEtc
              onClick={(e) => setReason(e.currentTarget.textContent ?? '')}
            >
              <div className="reason-group" style={{ display: 'flex' }}>
                <CheckBox type="cancel" checked={etc} onChange={setEtc} />
                {SENIOR_MENTOR_CANCEL.otherTitle}
              </div>
              <div style={{ display: 'flex' }}>
                <input
                  style={{
                    border: 'none',
                    fontWeight: '400',
                    fontSize: '16px',
                    height: '2rem',
                    width: '20rem',
                    backgroundColor: ' #F8F9FA',
                  }}
                  type="text"
                  placeholder={SENIOR_MENTOR_CANCEL.other}
                  onChange={(e) => setOtherReason(e.target.value)}
                ></input>
              </div>
            </SMCBtnEtc>
          </SMCancelMid>
          <div style={{ marginLeft: '1.45rem', marginTop: '3.5rem' }}>
            {flag ? (
              <SMCbtnCancelT onClick={cancelMentoring}>
                {submittingText}
              </SMCbtnCancelT>
            ) : (
              <SMCbtnCancelF>거절하기</SMCbtnCancelF>
            )}
          </div>
          </>
      )}
        </SModalMentoringBackground>
      
    </SMCBgContainer>
  );
}

export default SmentoringCancel;


