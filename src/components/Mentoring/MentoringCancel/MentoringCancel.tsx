import React from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { ModalMentoringclProps } from '@/types/modal/mentoringDetail';
import { MentoringData } from '@/types/mentoring/mentoring';
import {
  MentoringCancelBox,
  CancelBtn,
  NoCancelBtn,
} from './MentoringCancel.styled';
import { useEffect, useState } from 'react';

function MentoringCancel(props: ModalMentoringclProps) {
  const [data, setData] = useState<MentoringData[] | null>(null);
  const { getAccessToken } = useAuth();
  const [cancelStatus, setCancelStatus] = useState<string>('');
  const [noCancelText, setNoCancelText] = useState<string>('아니요');
  const [showCancelButton, setShowCancelButton] = useState<boolean>(true);
  const handleClick = () => {
    props.cancelModalHandler();
    if (props.onClick) props.onClick();
  };

  useEffect(() => {
    if (props.mentoringId!== null) {
    cancelMentoring();}
  }, []);

  const cancelMentoring = async () => {
    try {
      const Token = getAccessToken();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/me/${props.mentoringId}/cancel`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            mentoringId: props.mentoringId,
          }),
        },
      );
      const responseData = await response.json();
      setData(responseData);
      setShowCancelButton(false);
      setCancelStatus(responseData.success ? '취소되었습니다' : '취소 실패');
      // 서버측 성공 코드 확인후 수정예정
    } catch (error) {
      console.error('Error cancelling mentoring:', error);
    }
  };
  return (
    <MentoringCancelBox>
      {cancelStatus || '멘토링 신청을 취소하시겠어요?'}
      {showCancelButton ? (
        <div>
          <CancelBtn onClick={cancelMentoring}>취소</CancelBtn>
          <NoCancelBtn onClick={() => handleClick()}>아니요</NoCancelBtn>
        </div>
      ) : (
        <NoCancelBtn onClick={() => handleClick()}>확인했어요</NoCancelBtn>
      )}
    </MentoringCancelBox>
  );
}

export default MentoringCancel;
