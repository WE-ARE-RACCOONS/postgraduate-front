import { useState } from 'react';
import Image from 'next/image';
import NextBtn from '@/components/Button/NextBtn';
import { styled } from 'styled-components';

export function WishSeniorApplyAgreeModal({
  modalHandler,
}: {
  modalHandler: () => void;
}) {
  const [agreewithSeniorApply, setAgreeWithSeniorApply] = useState(false);

  return (
    <Container>
      <Header>
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={agreewithSeniorApply}
            onChange={() => setAgreeWithSeniorApply(!agreewithSeniorApply)}
            aria-label="개인정보 수집 및 이용 동의"
          />
          <Image
            src={agreewithSeniorApply ? '/checkbox_c.png' : '/checkbox_x.png'}
            alt=""
            width={24}
            height={24}
            role="presentation"
          />
        </label>
        <h1>개인정보 수집 및 이용에 동의해주세요</h1>
      </Header>
      <Content>
        수집된 개인정보는 멘토링 매칭과 알림을 위해 사용되며 <br />
        선배 매칭 후 진행 거부 시, 이후 서비스 이용이 제한될 수 있어요.
      </Content>
      <NextBtn
        kind={agreewithSeniorApply ? 'route' : 'route-non'}
        onClick={modalHandler}
        btnText="동의하고 신청하기"
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  gap: 16px;
  padding: 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > h1 {
    color: #000000;
    font-size: 14px;
    font-weight: 650;
  }
`;

export const Content = styled.div`
  color: #6d747e;
  font-size: 11px;
  margin-bottom: 100px;
`;
