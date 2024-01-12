import React from 'react';
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import { useRouter } from 'next/navigation';
import accept from '../../../../public/cState.png';
import { SmentoringAccBox } from './SmentoringAccept.styled';
import NextBtn from '@/components/Button/NextBtn';
function SmentoringAccept({ modalHandler }: { modalHandler: () => void }) {
  const router = useRouter();
  const setAccount = () => {
    router.push('/senior/account');
  };
  return (
    <SmentoringAccBox>
      <Image
        id="x-icon"
        src={x_icon}
        alt="닫기 버튼"
        sizes="(max-width: 600px) 3.rem"
        priority
        onClick={modalHandler}
      />
      <Image
        src={accept}
        width={80}
        height={80}
        style={{marginTop:'10.5rem',marginLeft:'9.25rem'}}
        alt="멘토링 승인 축하 이미지"
      />
      <div style={{marginTop:'2.75rem',textAlign:'center'}}>
      <h3 style={{marginBottom:'0.87rem'}}>후배와의 멘토링이 확정됐어요</h3>
      <div id='msg-show'>내멘토링 진행예정 탭에서 확인할 수 있어요</div>
      </div>
      <div id ='msg-btn'>계좌를 등록해야 멘토링 보수를 정산받을 수 있어요</div>
      <NextBtn kind='route' url='/senior/account' btnText='정산계좌 입력하기'/>
    </SmentoringAccBox>
  );
}

export default SmentoringAccept;
