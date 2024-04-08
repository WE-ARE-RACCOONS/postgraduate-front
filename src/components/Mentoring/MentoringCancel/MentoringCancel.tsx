import React, { useState } from 'react';
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
import Image from 'next/image';
import state from '@/../../public/state.png';
import cState from '@/../../public/cState.png';
import { useRouter } from 'next/navigation';
import findExCode from '@/utils/findExCode';
import { useAtom } from 'jotai';
import { JMCancelAtom } from '@/stores/condition';

function MentoringCancel(props: ModalMentoringclProps) {
  const [data, setData] = useState<MentoringData[] | null>(null);
  const { getAccessToken, removeTokens } = useAuth();
  const [cancelStatus, setCancelStatus] = useState<string>('');
  const [JMCancel, setJMCancel] = useAtom(JMCancelAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSuccess = () => {
    setCancelStatus('취소되었습니다');
    setJMCancel(true);
  };

  const handleError = () => {
    setCancelStatus('취소 실패');
  };

  const handleModalClose = () => {
    props.modalHandler();
    if (props.onClick) props.onClick();
    location.reload();
  };

  const cancelMentoring = async () => {
    try {
      setLoading(true);
      setCancelLoading(false);
      const Token = await getAccessToken();
      if (Token) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${props.mentoringId}/cancel`,
          { mentoringId: props.mentoringId },
          { headers }
        );

        if (findExCode(response.data.code)) {
          removeTokens();
          router.replace('/');
          return;
        }

        setData(response.data);
        response.data.code === 'MT201' ? handleSuccess() : handleError();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelHandleClick = () => {
    setCancelLoading(true);
    setTimeout(cancelMentoring, 2000);
  };

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      {loading || cancelLoading ? (
        '취소 중...'
      ) : (
        <>
          <Image
            id={cancelStatus === '취소되었습니다' ? 'cState' : 'state'}
            src={cancelStatus === '취소되었습니다' ? cState : state}
            alt={cancelStatus === '취소되었습니다' ? '확인상태' : '경고상태'}
            width={65}
            height={65}
            style={{ margin: '0.5rem 7.5rem', marginTop: cancelStatus === '취소되었습니다' ? '' : '1rem' }}
            priority
          />
          <MentoringCancelBox>
            <MCMain>
              {cancelStatus
                ? `${cancelStatus}`
                : '멘토링 신청을 취소하시겠어요?'}
            </MCMain>
            {cancelStatus || loading ? (
              <>
                {cancelStatus === '취소되었습니다' ? (
                  <>
                    <MCSub>
                      환불은 카드사 정책에 따라 영업일 기준 2~3일이 소요됩니다.
                    </MCSub>
                    <OkayBtn onClick={handleModalClose}>확인했어요</OkayBtn>
                  </>
                ) : (
                  <>
                    <MCSub>멘토링 취소가 실패했습니다.</MCSub>
                    <OkayBtn onClick={handleModalClose}>확인했어요</OkayBtn>
                  </>
                )}
              </>
            ) : (
              <>
                <MCSub>
                  반복되는 신청 취소시 멘토링 매칭에 불이익이 있을 수 있습니다.
                </MCSub>
                <div style={{ display: 'flex', marginTop: '1.8rem' }}>
                  <CancelBtn onClick={cancelHandleClick}>취소</CancelBtn>
                  <NoCancelBtn onClick={handleModalClose}>닫기</NoCancelBtn>
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
