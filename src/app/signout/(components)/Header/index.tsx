import styled from 'styled-components';
import Image from 'next/image';
import back_arrow from '/public/arrow.png';

export function SignOutHeader({ onClick }: { onClick: () => void }) {
  return (
    <header style={{ height: '3.5rem' }} onClick={onClick}>
      <Image
        src={back_arrow}
        alt="뒤로가기 화살표"
        width={24}
        height={24}
        style={{ color: '#2FC4B2', cursor: 'pointer' }}
      />
      <div>로그아웃</div>
    </header>
  );
}

const HeaderContainer = styled.div`
  width: inherit;
  height: 3.5rem;
  position: relative;
  height: 1.6rem;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 15px;
`;
