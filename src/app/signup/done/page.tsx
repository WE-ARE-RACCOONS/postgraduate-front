'use client';
import NextBtn from '@/components/Button/NextBtn';
import { prevPathAtom } from '@/stores/signup';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import party_popper from '../../../../public/party_popper.png';

function SignUpDonePage() {
  const prevPath = useAtomValue(prevPathAtom);

  return (
    <div>
      <h3>회원가입 완료!</h3>
      <div>
        대학원, 연구실 입학을 도와줄
        <br />
        선배들을 찾아 볼까요?
      </div>
      <Image
        src={party_popper}
        width={156}
        height={156}
        alt="회원가입 축하 이미지"
      />
      <div>
        <NextBtn kind="route" url={prevPath} btnText="보던 페이지로 가기" />
        <NextBtn kind="route" url="/" btnText="대학원 선배 둘러보기" />
      </div>
    </div>
  );
}

export default SignUpDonePage;
