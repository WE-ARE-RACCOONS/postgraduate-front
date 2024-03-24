import React from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { ModalMentoringclProps } from '@/types/modal/mentoringDetail';
import { MentoringData } from '@/types/mentoring/mentoring';
import {
  MentoringCancelBox,
  CancelBtn,
  NoCancelBtn,
  OkayBtn,
  MCMain,
  MCSub,
} from './MentoringCancel.styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import state from '@/../../public/state.png';
import cState from '@/../../public/cState.png';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';
function MentoringCancel(props: ModalMentoringclProps) {
  const [data, setData] = useState<MentoringData[] | null>(null);
  const { getAccessToken, removeTokens } = useAuth();
  const [cancelStatus, setCancelStatus] = useState<string>('');
  const [noCancelText, setNoCancelText] = useState<string>('아니요');
  const [showCancelButton, setShowCancelButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = () => {
    props.modalHandler();
    if (props.onClick) props.onClick();
  };

  const cancelMentoring = async () => {
    try {
      setLoading(true);

      getAccessToken().then(async (Token) => {
        if (Token) {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          };

          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${props.mentoringId}/cancel`,
            {
              mentoringId: props.mentoringId,
            },
            { headers },
          );

          if (findExCode(response.data.code)) {
            removeTokens();
            router.replace('/');
            return;
          }

          setData(response.data);
          if (response.data.code === 'MT201') {
            setCancelStatus('취소되었습니다');
          } else {
            setCancelStatus('취소 실패');
          }
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      {loading ? (
        '취소 중...'
      ) : (
        <>
          {cancelStatus ? (
            <Image
              id="cState"
              src={cState}
              alt="확인상태"
              width={65}
              height={65}
              style={{ margin: '0.5rem 7.5rem ' }}
              priority
            />
          ) : (
            <Image
              id="state"
              src={state}
              alt="경고상태"
              width={65}
              height={65}
              style={{ margin: ' 0.5rem 7.5rem' ,marginTop:'1rem'}}
              priority
            />
          )}
          <MentoringCancelBox>
            <MCMain>
              {cancelStatus
                ? `${cancelStatus}`
                : '멘토링 신청을 취소하시겠어요?'}
            </MCMain>
            {cancelStatus ? (
              <>
                <MCSub>
                  환불은 카드사 정책에 따라 영업일 기준 2~3일이 소요됩니다.
                </MCSub>
                <OkayBtn onClick={() => handleClick()}>확인했어요</OkayBtn>
              </>
            ) : (
              <>
                <MCSub>
                  반복되는 신청 취소시 멘토링 매칭에 불이익이 있을 수 있습니다.
                </MCSub>
                <div style={{ display: 'flex', marginTop: '1.8rem' }}>
                  <CancelBtn onClick={cancelMentoring}>취소</CancelBtn>
                  <NoCancelBtn onClick={() => handleClick()}>닫기</NoCancelBtn>
                </div>
              </>
            )}
          </MentoringCancelBox>
        </>
      )}
    </div>
  );
}

export default MentoringCancel;
