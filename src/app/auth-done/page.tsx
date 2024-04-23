'use client';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import cState from '../../../public/cState.png';
import { AUTH_DONE_MSG } from '@/constants/auth/done';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { profileRegAtom } from '@/stores/signup';

function AuthDonePage() {
  const router = useRouter();
  const profileReg = useAtomValue(profileRegAtom);

  function handleRegister() {
    router.push('/senior/edit-profile');
  }

  function handleConfirm() {
    router.push('/mypage');
  }

  return (
    <ADPContainer>
      <div id="auth-done-top-text">{AUTH_DONE_MSG.topText}</div>
      <ADPMidBox>
        <Image id="auth-done-img" src={cState} alt="완료 이미지" />
        <h2>{AUTH_DONE_MSG.title}</h2>
        <div id="auth-done-desc">{AUTH_DONE_MSG.description}</div>
      </ADPMidBox>
      {!profileReg && (
        <ADPBottomBox>
          <div id="fir-guide-msg" className="guide-msg">
            {AUTH_DONE_MSG.firGuide}
          </div>
          <div id="guide-msg-bottom-line">
            <div id="sec-guide-msg" className="guide-msg">
              {AUTH_DONE_MSG.secGuide}
            </div>
            <div id="thi-guide-msg" className="guide-msg">
              {AUTH_DONE_MSG.thiGuide}
            </div>
          </div>
        </ADPBottomBox>
      )}
      {profileReg ? (
        <ADPConfirmBtn onClick={handleConfirm} $isFull={profileReg}>
          {AUTH_DONE_MSG.btnText}
        </ADPConfirmBtn>
      ) : (
        <ADPBtnContainer>
          <button id='profile-register-btn' onClick={handleRegister}>{AUTH_DONE_MSG.profileBtn}</button>
          <ADPConfirmBtn onClick={handleConfirm} $isFull={profileReg}>
            {AUTH_DONE_MSG.btnText}
          </ADPConfirmBtn>
        </ADPBtnContainer>
      )}
    </ADPContainer>
  );
}

export default AuthDonePage;

const ADPContainer = styled.div`
  width: inherit;
  height: 100%;
  text-align: center;
  position: relative;

  #auth-done-top-text {
    margin-top: 0.875rem;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.5px;
  }
`;

const ADPMidBox = styled.div`
  width: 18.375rem;
  height: 13.5rem;
  text-align: center;
  position: absolute;
  top: 13.25rem;
  left: 50%;
  transform: translateX(-50%);

  #auth-done-img {
    width: 5rem;
    height: 5rem;
  }

  h2 {
    line-height: 140%;
    letter-spacing: -0.5px;
    margin-top: 2.75rem;
  }

  #auth-done-desc {
    color: #868e96;
    line-height: 140%;
    letter-spacing: -0.5px;
    margin-top: 0.875rem;
  }
`;

const ADPBottomBox = styled.div`
  width: 21.44rem;
  height: 4.25rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
  text-align: center;
  position: absolute;
  top: 35rem;
  left: 50%;
  transform: translateX(-50%);

  .guide-msg {
    line-height: 140%;
    letter-spacing: -0.5px;
  }

  #guide-msg-bottom-line {
    width: 14rem;
    height: 1.375rem;
    display: flex;
    margin: 0 auto;
  }

  #fir-guide-msg {
    height: 1.375rem;
    margin-top: 0.75rem;
  }

  #sec-guide-msg {
    color: #2fc4b2;
  }
`;

const ADPBtnContainer = styled.div`
  width: 21.44rem;
  height: 3.375rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 40.125rem;
  left: 50%;
  transform: translateX(-50%);

  #profile-register-btn {
    width: 10.69rem;
    height: 3.375rem;
    border: 0;
    border-radius: 0.75rem;
    background-color: #ADB5BD;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: -1px;
    cursor: pointer;
  }
`

const ADPConfirmBtn = styled.button<{ $isFull: boolean }>`
  width: ${props => props.$isFull ? '21.19rem' : '9.94rem'};
  height: 3.375rem;
  border: 0;
  border-radius: 0.75rem;
  background-color: #2fc4b2;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  position: relative;

  ${props => props.$isFull && css`
    position: absolute;
    top: 40.125rem;
    left: 50%;
    transform: translateX(-50%);
  `}
  cursor: pointer;
`;
