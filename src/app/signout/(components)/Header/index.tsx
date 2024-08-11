import styled from 'styled-components';
import Image from 'next/image';
import back_arrow from '/public/signoutarrow.png';

export function SignOutHeader({ onClick }: { onClick: () => void }) {
  return (
    <HeaderContainer onClick={onClick}>
      <Image src={back_arrow} alt="뒤로가기 화살표" width={6} height={12} />
      <div>회원 탈퇴</div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: inherit;
  margin: 20px auto;
  height: 56px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-left: 0.75rem;

  > img {
    margin-right: 0.5rem;
    cursor: pointer;
  }

  > div {
    font-size: 16px;
    font-weight: 700;
  }
`;
