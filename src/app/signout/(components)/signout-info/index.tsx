import { SignOutInfoContainer } from '@/app/signout/(components)/signout-type-select';
import NextBtn from '@/components/Button/NextBtn';
export function SignOutInfo({ onClick }: { onClick: () => void }) {
  return (
    <SignOutInfoContainer>
      <h1>회원 탈퇴 안내</h1>
      <div className="nextBtn_container">
        <NextBtn kind={'route'} btnText="다음으로" onClick={onClick} />
      </div>
    </SignOutInfoContainer>
  );
}
