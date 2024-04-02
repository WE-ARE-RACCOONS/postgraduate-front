'use client';
import NextBtn from '@/components/Button/NextBtn';
import { prevPathAtom } from '@/stores/signup';
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
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

function SignUpDonePage() {
  const router = useRouter();
  const prevPath = useAtomValue(prevPathAtom);
  const { getUserType } = useAuth();
  const [userType, setUserType] = useState('');
  const { modal, modalHandler, portalElement } = useModal(
    'senior-profile-portal',
  );

  useEffect(() => {
    const userT = getUserType();
    if(userT) setUserType(userT);
  }, []);

  return (
    <div>
      <BackHeader headerText="회원가입" kind="home" />
      <div style={{ textAlign: 'center', marginTop: '6.5rem' }}>
        <Image
          src={party_popper}
          width={172}
          height={164}
          style={{ marginBottom: '0.46rem' }}
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
            <h3>회원 등록 완료!</h3>
            <DoneFont>
              영업일 기준 48시간 안에 선배 회원으로 승인돼요
              <br />
              승인되면 카카오 알림톡으로 알려드릴게요!
            </DoneFont>
          </>
        )}
      </div>
      {userType == 'junior' && (
        <div style={{ marginTop: '21%', textAlign: 'center' }}>
          <NextBtn kind="route" url="/" btnText="대학원 선배 둘러보기" />
          <NextBtn kind="prev" url={prevPath} btnText="이전 페이지로 가기" />
        </div>
      )}
      {userType == 'senior' && (
        <>
          <SDoneBottomMsg>
            <div style={{ display: 'flex' }}>
              <div>
                대학원 선배 프로필을 등록해야
                <br />
                <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                  <div id="sdone-msg-color">멘토링을 시작</div>할 수 있어요.
                </div>
              </div>
            </div>
          </SDoneBottomMsg>
          <div
            style={{
              display: 'flex',
              margin: '0 1rem',
              marginTop: '0.3rem',
              justifyContent: 'center',
            }}
          >
            <ClickedBtn
              kind="out"
              clickHandler={modalHandler}
              btnText="다음에 할게요"
            />
            <ClickedBtn
              kind="profileAdd"
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
  color: #868e96;
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.03125rem;
  margin-top: 0.88rem;
`;
const SDoneBottomMsg = styled.div`
  padding: 0.75rem 4rem;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 2.8rem;
  margin-left: 1rem;
  width: 93%;
  height: 4.25rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #f8f9fa;
  color: #212529;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.95rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.03125rem;
  #sdone-msg-color {
    color: #2fc4b2;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.03125rem;
  }
`;

export default SignUpDonePage;
