import { SignOutInfoContainer } from '@/app/signout/(components)/signout-type-select';
import { useSignOutInfo } from '@/app/signout/signoutContext';
import NextBtn from '@/components/Button/NextBtn';
import styled from 'styled-components';
import {
  SIGNOUT_REASON_JUNIOR,
  SIGNOUT_REASON_SENIOR,
} from '@/app/signout/constant';

export function SignOutReason({ onClick }: { onClick: () => void }) {
  const { signOutInfo, setSignOutInfo } = useSignOutInfo();

  console.log(signOutInfo);
  const signOutReasons = signOutInfo?.isJunior
    ? Object.entries(SIGNOUT_REASON_JUNIOR)
    : Object.entries(SIGNOUT_REASON_SENIOR);

  const handleReasonClick = (reason: string) => {
    console.log(reason);

    // 추가적인 로직이 필요한 경우 여기에 작성
    if (signOutInfo?.isJunior) {
      // 주니어일 때의 추가 로직 (필요시)
      setSignOutInfo?.({
        isJunior: signOutInfo?.isJunior,
        signOutReason: reason,
      });
    } else {
      // 시니어일 때의 추가 로직 (필요시)
    }
  };

  return (
    <SignOutInfoContainer className="stepper-tab">
      <div className="image_container">
        <ReasonContainer>
          <p>
            탈퇴 이유
            <RequiredMark>*</RequiredMark>
          </p>
          {signOutReasons.map(([key, value]) => (
            <ReasonItem key={key} onClick={() => handleReasonClick(key)}>
              {value}
            </ReasonItem>
          ))}
          {signOutInfo?.signOutReason === 'ETC' && <div>기타항목</div>}
        </ReasonContainer>
      </div>
      <div className="nextBtn_container">
        <NextBtn kind={'route'} btnText="다음으로" onClick={onClick} />
      </div>
    </SignOutInfoContainer>
  );
}

const ReasonContainer = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #1f1f1f;
`;

const RequiredMark = styled.span`
  color: #ff7272;
  font-weight: bold;
  margin-left: 3px;
`;

const ReasonItem = styled.div`
  cursor: pointer; /* 클릭 가능한 요소임을 시각적으로 표시 */
  &:hover {
    text-decoration: underline; /* 마우스 오버 시 스타일 추가 */
  }
`;
