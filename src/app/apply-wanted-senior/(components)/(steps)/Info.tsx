import Image from 'next/image';
import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import NextBtn from '@/components/Button/NextBtn';
import { WishSeniorTitle, WishSeniorSubTitle, NextBtnBox } from '../(template)';

export function WishSeniorInfo({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ margin: '1.6rem 1rem' }}>
      <WishSeniorTitle>{WISH_SENIOR_MENTOR_MSG.INFO.TITLE}</WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        {WISH_SENIOR_MENTOR_MSG.INFO.SUB_TITLE}
      </WishSeniorSubTitle>

      <ImageWrapper>
        <Image
          src={'/wish_senior_info.png'}
          alt="원하는 선배 신청 페이지"
          width={308}
          height={225}
        />
      </ImageWrapper>
      <NextBtnBox>
        <NextBtn btnText="시작" kind="route" onClick={onClick} />
      </NextBtnBox>
    </div>
  );
}

const ImageWrapper = styled.div`
  margin-top: 40px;
`;
