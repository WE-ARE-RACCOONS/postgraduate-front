import React from 'react';
import Image from 'next/image';
import x_icon from '../../../../../public/x.png';
import { useRouter } from 'next/navigation';
import accept from '../../../../../public/cState.png';
import { SmentoringAccBox } from './SmentoringAccept.styled';
import NextBtn from '@/components/comon/Button/NextBtn';
import { useAtomValue } from 'jotai';
import { accountAtom } from '@/stores/senior';
function SmentoringAccept({ modalHandler }: { modalHandler: () => void }) {
  const router = useRouter();
  const userAccount = useAtomValue(accountAtom);
  const setAccount = () => {
    router.push('/senior/account');
  };
  const acceptClick = () => {
    modalHandler();
    location.reload();
  };
  return (
    <SmentoringAccBox>
      <Image
        id="x-icon"
        src={x_icon}
        alt="닫기 버튼"
        sizes="(max-width: 600px) 3.rem"
        priority
        onClick={acceptClick}
      />
      <div style={{ textAlign: 'center' }}>
        <Image
          src={accept}
          width={80}
          height={80}
          style={{ marginTop: '10rem' }}
          alt="멘토링 승인 축하 이미지"
        />
        <h3 style={{ marginBottom: '0.87rem', marginTop: '2.65rem' }}>
          후배와의 멘토링이 확정됐어요
        </h3>
        <div id="msg-show">내멘토링 진행예정 탭에서 확인할 수 있어요</div>
      </div>
      {userAccount === true ? (
        <div id="msg-btn">계좌가 이미 등록되어 있어요.</div>
      ) : (
        <div id="msg-btn">계좌를 등록해야 멘토링 보수를 정산받을 수 있어요</div>
      )}
      {userAccount === true ? (
        <NextBtn
          kind="route"
          onClick={acceptClick}
          url="/senior/mentoring"
          btnText="내 멘토링 보러가기"
        />
      ) : (
        <NextBtn
          kind="route"
          url="/senior/account"
          btnText="정산계좌 입력하기"
        />
      )}
    </SmentoringAccBox>
  );
}

export default SmentoringAccept;
