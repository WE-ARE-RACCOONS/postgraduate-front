import React from 'react'
import Image from 'next/image';
import party_popper from '../../../../public/party_popper.png';
function SmentoringAccept() {
  return (
    <div>
        <div>후배와의 멘토링이 확정됐어요</div>
        <div>내멘토링 진행예정 탭에서 확인할 수 있어요</div>
        <Image
        src={party_popper}
        width={156}
        height={156}
        alt="멘토링 승인 축하 이미지"
      />
      <div>멘토링 정산을 받으려면 정산 계좌를 등록해야 해요</div>
    <div>내멘토링 진행예정 탭에서 확인할 수 있어요</div>
    <div>지금 바로 계좌를 등록하러 가볼까요?</div>
    <button>정산계좌 입력하기</button>
    </div>
  )
}

export default SmentoringAccept
