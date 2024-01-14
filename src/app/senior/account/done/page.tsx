'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import accept from '../../../../../public/cState.png';
import styled from 'styled-components';
import NextBtn from '@/components/Button/NextBtn';
import ClickedBtn from '@/components/Button/ClickedBtn';
function page() {
  const router = useRouter();
  const moneHandler = () => {
    router.push('/senior/mentoring');
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={accept}
          width={80}
          height={80}
          style={{ marginTop: '13rem' }}
          alt="계좌 등록 축하 이미지"
        />
      </div>
      <ADFont>
        <h3>정산 정보 등록이 완료됐어요</h3>
        <div id="msg-mid">마이페이지 - 내프로필 수정에서 수정할 수 있어요</div>
      </ADFont>
      <NextBtn kind="route" btnText="확인" onClick={moneHandler} />
    </div>
  );
}
const ADFont = styled.div`
  margin-top: 2.75rem;
  text-align: center;
  margin-bottom: 8.5rem;
  #msg-mid {
    color: #868e96;
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.4rem */
    letter-spacing: -0.03125rem;
    margin-top: 0.88rem;
  }
`;

export default page;
