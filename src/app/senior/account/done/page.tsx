'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import party_popper from '../../../../../public/party_popper.png';
function page() {
  const router = useRouter();
  const moneHandler = () => {
    router.push('/senior/mentoring');
  };
  return (
    <div>
      <div>정산 정보 등록이 완료됐어요</div>
      <div>마이페이지 - 내프로필 수정에서 수정할 수 있어요</div>
      <div>
        <Image
          src={party_popper}
          width={156}
          height={156}
          alt="계좌 등록 축하 이미지"
        />
      </div>
      <button onClick={moneHandler}>확인했어요</button>
    </div>
  );
}

export default page;
