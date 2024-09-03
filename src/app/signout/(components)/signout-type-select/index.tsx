import Image from 'next/image';
import styled from 'styled-components';
import SignOutJuniorImage from '/public/signout_junior.png';
import SignOutSeniorImage from '/public/signout_senior.png';
import NextBtn from '@/components/Button/NextBtn';
import { useSignOutInfo } from '@/app/signout/signoutContext';

export function SignOutTypeSelect({ onClick }: { onClick: () => void }) {
  const { setSignOutInfo, signOutInfo } = useSignOutInfo();

  const isJunior = signOutInfo?.isJunior;

  return (
    <SignOutInfoContainer className="stepper-tab">
      <h1>회원 유형 선택</h1>
      <div className="image_container">
        <StyledImage
          width={153}
          height={198}
          src={SignOutJuniorImage}
          alt="대학생 후배 탈퇴"
          isSelected={isJunior ?? false}
          onClick={() =>
            setSignOutInfo?.({
              signOutReason: 'DIS_SATISFACTION',
              isJunior: true,
            })
          }
        />
        <StyledImage
          width={153}
          height={198}
          isSelected={isJunior === false}
          src={SignOutSeniorImage}
          alt="대학원 선배 탈퇴"
          onClick={() => {
            setSignOutInfo?.({
              signOutReason: 'DIS_SATISFACTION',
              isJunior: false,
            });
          }}
        />
      </div>
      <div className="nextBtn_container">
        <NextBtn
          kind={typeof isJunior !== 'undefined' ? 'route' : 'route-non'}
          btnText="다음으로"
          onClick={onClick}
        />
      </div>
    </SignOutInfoContainer>
  );
}

export const SignOutInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;

  > h1 {
    font-size: 20px;
    margin-left: 24px;
    font-weight: bold;
    color: #212529;
  }

  > .image_container {
    display: flex;
    margin-top: 5rem;
    margin-left: auto;
    margin-right: auto;
    gap: 5px;
    align-items: flex-end;
    width: 90%;
    cursor: pointer;
  }

  > .nextBtn_container {
    margin-top: auto;
  }
`;

const StyledImage = styled(Image)<{ isSelected: boolean }>`
  cursor: pointer;
  border: ${(props) => props.isSelected && '2px solid #2fc4b2'};
`;
