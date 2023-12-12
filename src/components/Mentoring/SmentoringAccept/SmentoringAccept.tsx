import React from 'react'
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import { useRouter } from 'next/navigation';
import party_popper from '../../../../public/party_popper.png';
function SmentoringAccept({ modalHandler }: { modalHandler: () => void }) {
  const router = useRouter();
  const setAccount = () => {
    router.push('/senior/account');
  };
  return (
    <div>
      <Image
          id="x-icon"
          src={x_icon}
          alt="닫기 버튼"
          sizes="(max-width: 600px) 3.rem"
          priority
          onClick={modalHandler}
        />
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
    <button onClick={setAccount}>정산계좌 입력하기</button>
    </div>
  )
}

export default SmentoringAccept
