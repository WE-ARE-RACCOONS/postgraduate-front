import { SignOutInfoContainer } from '@/app/signout/(components)/signout-type-select';
import styled from 'styled-components';
import NextBtn from '@/components/common/Button/NextBtn';
export function SignOutInfo({ onClick }: { onClick: () => void }) {
  return (
    <SignOutInfoContainer>
      <h1>회원 탈퇴 안내</h1>
      <SignOutInfoContent>
        <div>
          1. 회원정보는 탈퇴 후 삭제 또는 서비스와 격리하여 보존 조치합니다.
        </div>

        <div>
          2. 불량 이용자의 재가입 방지, 명예훼손 등 권리 침해 분쟁 및 수사 협조
          등을 위한 한시적인 개인정보 보존 조치는 개인정보 취급 방침을 따릅니다.
        </div>

        <div>
          3. 탈퇴 후에는 같은 계정으로 30일 동안 재가입이 제한됩니다. 회원
          탈퇴를 신중히 진행해주세요.
        </div>

        <div>4. 탈퇴 후 15일 이내 로그인 시 재활성화가 가능합니다.</div>
      </SignOutInfoContent>
      <div className="nextBtn_container">
        <NextBtn kind={'route'} btnText="다음으로" onClick={onClick} />
      </div>
    </SignOutInfoContainer>
  );
}

const SignOutInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  min-height: 330px;
  background-color: #f0f0f0;

  > div {
    display: flex;
    height: 80%;
    font-size: 14px;
    align-items: center;
    padding: 0 20px;
    gap: 10px;
  }
`;
