'use client';
import NextBtn from '@/components/Button/NextBtn';
import { prevPathAtom, userTypeAtom } from '@/stores/signup';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import party_popper from '../../../../public/party_popper.png';
import ClickedBtn from '@/components/Button/ClickedBtn';
import useModal from '@/hooks/useModal';
import { createPortal } from 'react-dom';
import DimmedModal from '@/components/Modal/DimmedModal';
import { useRouter } from 'next/navigation';
import BackHeader from '@/components/Header/BackHeader';
import styled from 'styled-components';
function SignUpDonePage() {
  const prevPath = useAtomValue(prevPathAtom);
  const userType = useAtomValue(userTypeAtom);
  const { modal, modalHandler, portalElement } = useModal(
    'senior-profile-portal',
  );
  const router = useRouter();

  return (
    <div>
      <BackHeader headerText='회원가입'/>
      <div style={{textAlign:'center',marginTop:'6.5rem'}}>
      <Image
        src={party_popper}
        width={172}
        height={164}
        style={{marginBottom:'0.46rem'}}
        alt="회원가입 축하 이미지"
      />
      {userType == 'junior' && (
        <>
          <h3>회원가입 완료!</h3>
          <DoneFont>
            대학원, 연구실 입학을 도와줄
            <br />
            선배들을 찾아 볼까요?
          </DoneFont>
        </>
      )}
      {userType == 'senior' && (
        <>
          <h3>선배 회원가입이 완료됐어요</h3>
          <DoneFont>
            영업일 기준 48시간 안에 선배 회원으로 승인돼요
            <br />
            승인되면 카카오 알림톡으로 알려드릴게요!
          </DoneFont>
        </>
      )}
      </div>
      {userType == 'junior' && (
        <div style={{marginTop:'21%',textAlign:'center'}}>
          <NextBtn kind="route" url="/" btnText="대학원 선배 둘러보기" />
          <NextBtn kind="prev" url={prevPath} btnText="이전 페이지로 가기" />
        </div>
      )}
      {userType == 'senior' && (
        <>
          <div>
            대학원 선배 프로필을 등록하면 멘토링을 시작할 수 있어요.
            <br />
            지금 프로필을 작성하러 가볼까요?
          </div>
          <div>
            {/* <button>다음에 할게요</button>
            <button>프로필 등록하기</button> */}
            <ClickedBtn clickHandler={modalHandler} btnText="다음에 할게요" />
            <ClickedBtn
              clickHandler={() => {
                router.push('/add-profile');
              }}
              btnText="프로필 등록하기"
            />
          </div>
        </>
      )}
      {modal && portalElement
        ? createPortal(
            <DimmedModal
              modalType="postgraduProfile"
              modalHandler={modalHandler}
            />,
            portalElement,
          )
        : null}
    </div>
  );
}

const DoneFont = styled.div`
color: #868E96;
text-align: center;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.4rem */
letter-spacing: -0.03125rem;
margin-top: 0.88rem;
`;

export default SignUpDonePage;
