import { SignOutInfoContainer } from '@/app/signout/(components)/signout-type-select';
import { useSignOutInfo } from '@/app/signout/signoutContext';
import NextBtn from '@/components/Button/NextBtn';
import styled from 'styled-components';
import TextForm from '@/components/SingleForm/TextForm';

import {
  SIGNOUT_REASON_JUNIOR,
  SIGNOUT_REASON_SENIOR,
} from '@/app/signout/constant';

export function SignOutReason({ onClick }: { onClick: () => void }) {
  const { signOutInfo, setSignOutInfo } = useSignOutInfo();

  const signOutReasons = signOutInfo?.isJunior
    ? Object.entries(SIGNOUT_REASON_JUNIOR)
    : Object.entries(SIGNOUT_REASON_SENIOR);

  const handleReasonClick = (reason: string) => {
    console.log(reason);
    setSignOutInfo?.({
      isJunior: signOutInfo?.isJunior,
      signOutReason: reason,
    });
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
          {signOutInfo?.signOutReason === 'ETC' && (
            <TextForm
              placeholder="자유롭게 입력해주세요!"
              targetAtom=""
              max={500}
            />
          )}
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
  cursor: pointer;
`;
