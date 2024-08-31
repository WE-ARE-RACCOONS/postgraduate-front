import { SignOutInfoContainer } from '@/app/signout/(components)/signout-type-select';
import { useSignOutInfo } from '@/app/signout/signoutContext';
import NextBtn from '@/components/Button/NextBtn';
import Image from 'next/image';
import styled from 'styled-components';
import ArrowDownGray from '../../../../../public/arrow-down.png';
import MatchingForm from '@/components/SingleForm/MatchingForm';
import TextForm from '@/components/SingleForm/TextForm';
import { useState } from 'react';

import {
  SIGNOUT_REASON_JUNIOR,
  SIGNOUT_REASON_SENIOR,
} from '@/app/signout/constant';

type SignOutReasonType =
  | keyof typeof SIGNOUT_REASON_JUNIOR
  | keyof typeof SIGNOUT_REASON_SENIOR;

export function SignOutReason({ onClick }: { onClick: () => void }) {
  const { signOutInfo, setSignOutInfo, getSignOutReasonMessage } =
    useSignOutInfo();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [etcLength, setETCLength] = useState<number>(0);

  const signOutReasons = signOutInfo?.isJunior
    ? Object.entries(SIGNOUT_REASON_JUNIOR)
    : Object.entries(SIGNOUT_REASON_SENIOR);

  const handleReasonClick = (reason: SignOutReasonType) => {
    if (signOutInfo) {
      setSignOutInfo?.({
        isJunior: signOutInfo.isJunior,
        signOutReason: reason,
      });
      setDropdownOpen(false);
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
          <DropDownContainer onClick={() => setDropdownOpen((prev) => !prev)}>
            <SelectedReason>
              {getSignOutReasonMessage() || '이유를 선택하세요'}
            </SelectedReason>
            {isDropdownOpen && (
              <Image
                src={ArrowDownGray}
                width={24}
                height={24}
                alt="arrowDown"
              />
            )}
          </DropDownContainer>
          {isDropdownOpen && (
            <DropdownList>
              {signOutReasons.map(([key, value]) => (
                <ReasonItem
                  key={key}
                  onClick={() => handleReasonClick(key as SignOutReasonType)}
                >
                  {value}
                </ReasonItem>
              ))}
            </DropdownList>
          )}

          {signOutInfo?.signOutReason === 'ETC' && (
            <MatchingForm
              title=""
              isRequired
              maxLength={500}
              placeholder="자유롭게 입력해주세요"
              charCount={etcLength}
              handler={(v) => {
                setETCLength(v.length);
                setSignOutInfo?.({
                  isJunior: signOutInfo.isJunior,
                  signOutReason: 'ETC',
                  etc: v + '',
                });
              }}
            />
          )}
        </ReasonContainer>
      </div>
      <div className="nextBtn_container">
        <NextBtn
          kind={signOutInfo?.signOutReason ? 'route' : 'route-non'}
          btnText="회원탈퇴하기"
          onClick={onClick}
        />
      </div>
    </SignOutInfoContainer>
  );
}

const ReasonContainer = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  color: #1f1f1f;
`;

const DropDownContainer = styled.div`
  display: flex;
  font-weight: normal;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #3e3e3e;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 325px;
  margin: 25px auto;
`;

const SelectedReason = styled.div`
  color: #3c3c3c;
  padding-left: 18px;
  height: 42px;
  display: flex;
  align-items: center;
`;

const DropdownList = styled.div`
  background-color: white;
  border: 1px solid #dfdfdf;
  color: #3c3c3c;
  font-weight: normal;
  border-radius: 15px;
  margin-top: 5px;
`;

const RequiredMark = styled.span`
  color: #ff7272;
  font-weight: bold;
  margin-left: 3px;
`;

const ReasonItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #dfdfdf;
  &:hover {
    font-weight: bold;
  }
`;
