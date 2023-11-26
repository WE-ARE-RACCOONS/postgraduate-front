'use client';
import NextBtn from '@/components/Button/NextBtn';
import { prevPathAtom, userTypeAtom } from '@/stores/signup';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import party_popper from '../../../../public/party_popper.png';

function SignUpDonePage() {
  const prevPath = useAtomValue(prevPathAtom);
  const userType = useAtomValue(userTypeAtom);

  return (
    <div>
      {userType == 'junior' && (
        <>
          <h3>회원가입 완료!</h3>
          <div>
            대학원, 연구실 입학을 도와줄
            <br />
            선배들을 찾아 볼까요?
          </div>
        </>
      )}
      {userType == 'senior' && (
        <>
          <h3>선배 회원가입이 완료됐어요</h3>
          <div>
            영업일 기준 48시간 안에 선배 회원으로 승인돼요
            <br />
            승인되면 카카오 알림톡으로 알려드릴게요!
          </div>
        </>
      )}
      <Image
        src={party_popper}
        width={156}
        height={156}
        alt="회원가입 축하 이미지"
      />
      {userType == 'junior' && (
        <div>
          <NextBtn kind="route" url={prevPath} btnText="보던 페이지로 가기" />
          <NextBtn kind="route" url="/" btnText="대학원 선배 둘러보기" />
        </div>
      )}
      {userType == 'senior' && (
        <>
          <div>
            대학원 선배 프로필을 등록하면 멘토링을 시작할 수 있어요.
            <br />
            지금 프로필을 작성하러 가볼까요?
          </div>
          <div>
            <button>다음에 할게요</button>
            <button>프로필 등록하기</button>
          </div>
        </>
      )}
    </div>
  );
}

export default SignUpDonePage;
