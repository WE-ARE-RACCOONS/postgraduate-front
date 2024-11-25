import NextBtn from '@/components/Button/NextBtn';
import { WishSeniorSubTitle, WishSeniorTitle } from '../../page';
import { BtnStyleNonM } from '@/components/Button/NextBtn/NextBtn.styled';
import Image from 'next/image';

interface ApplyWantedSeniorSubmitProp {
  onClickAnotherSubmit: () => void;
  onClickSumitEnd: () => void;
}
export function ApplyWantedSeniorSubmit({
  onClickAnotherSubmit,
  onClickSumitEnd,
}: ApplyWantedSeniorSubmitProp) {
  return (
    <div
      style={{
        margin: '1.6rem auto',
        display: 'flex',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <WishSeniorTitle>멘토링 신청 완료!</WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        대학원 김선배가 원하는 선배를
        <br />
        빠르게 만날 수 있도록 도와드릴게요!
      </WishSeniorSubTitle>
      <br />
      <Image
        src="/wish-senior-end.png"
        alt="원하는 선배 신청 완료 이미지"
        width={212}
        height={212}
      />

      <div
        style={{
          width: '330px',
          position: 'absolute',
          top: '30rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <BtnStyleNonM onClick={onClickAnotherSubmit}>
          또 다른 선배 신청하기
        </BtnStyleNonM>

        <NextBtn
          kind="next"
          onClick={onClickSumitEnd}
          btnText="신청 완료하고 홈으로 가기"
        />
      </div>
    </div>
  );
}
