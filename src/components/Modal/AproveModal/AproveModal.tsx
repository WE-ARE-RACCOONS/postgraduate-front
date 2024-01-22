import React from 'react';
import x_icon from '../../../../public/x.png';
import Image from 'next/image';
import {
  APMBoxTop,
  APMMid,
  APMMain,
  APMMidub,
  APMMBottom,
  APMMBtn,
} from './AproveModal.styled';
function AproveModal({
  modalHandler,
  certifiReg,
}: {
  certifiReg: string;
  modalHandler: () => void;
}) {
  const xClick = () => {
    modalHandler();
  };
  return (
    <div>
      <APMBoxTop>
        <Image
          id="x-icon"
          src={x_icon}
          alt="닫기 버튼"
          sizes="(max-width: 600px) 2.rem"
          priority
          onClick={xClick}
          style={{
            width: '2.3rem',
            height: '2.3rem',
            margin: '1rem',
            color: '#CBCFDB',
          }}
        />
      </APMBoxTop>
      <APMMid>
        {certifiReg === 'APPROVE' ? (
          <>
            <APMMain>이미 선배 회원으로 승인됐어요.</APMMain>
            <APMMidub>프로필 등록을 마치면</APMMidub>
            <APMMidub>멘토링을 진행할 수 있어요.</APMMidub>
          </>
        ) : (
          <>
            <APMMain>선배 회원 승인 대기 중이에요.</APMMain>
            <APMMidub>영업일 기준 1~3일 이내로 </APMMidub>
            <APMMidub>대학원생 선배 회원으로 승인돼요.</APMMidub>
            <APMMidub>승인되면 카카오 알림톡으로 알려드릴게요!</APMMidub>
          </>
        )}
      </APMMid>
      <APMMBottom>
        <APMMBtn onClick={xClick}>확인</APMMBtn>
      </APMMBottom>
    </div>
  );
}

export default AproveModal;
