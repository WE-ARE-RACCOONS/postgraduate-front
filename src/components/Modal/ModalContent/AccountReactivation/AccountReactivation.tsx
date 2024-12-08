import styled from 'styled-components';
import NextBtn from '@/components/common/Button/NextBtn';

import { BtnStyleNon } from '@/components/common/Button/NextBtn/NextBtn.styled';
interface AccountReactivationProps {
  onActive?: () => void;
  onNonActive?: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  text-align: center;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  div {
    font-size: 16px;
    width: 100%;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 20px;
    }

    div {
      font-size: 14px;
    }
  }
`;

function AccountReactivation({
  onActive,
  onNonActive,
}: AccountReactivationProps) {
  return (
    <Container>
      <h2>계정을 재활성화 하시겠어요?</h2>
      <div>
        “재활성화 합니다.” 버튼을 클릭하시면 계정이 재활성화 되며 계정
        비활성화가 중단됩니다.
      </div>
      <NextBtn kind="route" btnText="재활성화합니다." onClick={onActive} />
      <BtnStyleNon onClick={onNonActive}>아니오.</BtnStyleNon>
    </Container>
  );
}

export default AccountReactivation;
