import Image from 'next/image';
import styled from 'styled-components';
import SignOutJuniorImage from '/public/signout_junior.png';
import SignOutSeniorImage from '/public/signout_senior.png';
import NextBtn from '@/components/Button/NextBtn';
import { useSignOutInfo } from '@/app/signout/signoutContext';

export function SignOutInfo({ onClick }: { onClick: () => void }) {
  const { setSignOutInfo, signOutInfo } = useSignOutInfo();

  const isJunior = signOutInfo?.isJunior;
  console.log(isJunior);
  return (
    <SignOutInfoContainer>
      <h1>회원 유형 선택</h1>
      <div className="image_container">
        <StyledImage
          width={153}
          height={198}
          src={SignOutJuniorImage}
          alt="대학생 후배 탈퇴"
          isSelected={isJunior ?? false}
          onClick={() =>
            setSignOutInfo({
              signOutReason: 'ETC',
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
            setSignOutInfo({
              signOutReason: 'ETC',
              isJunior: false,
            });
          }}
        />
      </div>
      <div className="nextBtn_container">
        <NextBtn kind={'route'} btnText="다음으로" onClick={onClick} />
      </div>
    </SignOutInfoContainer>
  );
}

const SignOutInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  > h1 {
    font-size: 20px;
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
    justify-content: center;
    width: 80%;
    cursor: pointer;
  }

  > .nextBtn_container {
    margin-top: auto;
    margin-bottom: 100px;
  }
`;

const StyledImage = styled(Image)<{ isSelected: boolean }>`
  cursor: pointer;
  border: ${(props) => props.isSelected && '2px solid #2fc4b2'};
`;
