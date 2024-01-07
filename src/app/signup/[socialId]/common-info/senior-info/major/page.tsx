'use client';
import ModalBtn from '@/components/Button/ModalBtn';
import NextBtn from '@/components/Button/NextBtn';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import TextForm from '@/components/SingleForm/TextForm';
import SingleValidator from '@/components/Validator/SingleValidator';
import useModal from '@/hooks/useModal';
import { option } from '@/stores/condition';
import {
  photoUrlAtom,
  sFieldAtom,
  sKeywordAtom,
  sLabAtom,
  sMajorAtom,
  sPostGraduAtom,
  sProfessorAtom,
} from '@/stores/senior';
import { nickname, phoneNum, userTypeAtom } from '@/stores/signup';
import { ModalType } from '@/types/modal/riseUp';
import axios from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';

function SeniorInfoPage() {
  const [modalType, setModalType] = useState<ModalType>('postgradu');
  const [emptyPart, setEmptyPart] = useState('');
  const [flag, setFlag] = useState(false);
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
  const router = useRouter();
  const { getAccessToken, setAccessToken, setRefreshToken, setUserType } =
    useAuth();
  const Token = getAccessToken();
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const socialId = pathArr[2];
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);
  useEffect(() => {
    if (sPostGradu && sMajor)
      setFlag(false);
  }, [sPostGradu, sMajor]);
  const handleSubmit = () => {
    /**
     * 1. 값 다 들어 있나 확인
     * 2. 없으면 최초로 없는 값 SingleValidator 띄우고(flag true)
     * 3. 있으면 회원가입 api 호출 후(flag false로 설정, userType senior로 설정)
     * 4. api 호출 성공하면 signup/done 으로 이동
     */

    if (!sPostGradu) {
      setFlag(true);
      setEmptyPart('대학원');
      return;
    }

    if (!sMajor) {
      setFlag(true);
      setEmptyPart('학과');
      return;
    }
    setFlag(false);
    router.push(`/signup/${socialId}/common-info/senior-info/lab`)
    }

  return (
    <>
    <div style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)' }}>
      <BackHeader headerText='정보입력'/>
    </div>
    <SeniorInfoPageContainer>
      <SICBox>
      <h3>선배 정보를 입력해주세요</h3>
      <div id ='info-content-msg'>입력한 정보는 멘토링 매칭에 이용됩니다.</div>
      </SICBox>
      <BtnContainer>
      <h3>대학원 정보를 알려주세요.</h3>
      <BtnBox>
      <div>대학원 *</div>
        <ModalBtn
        type='seniorInfo'
          btnText={sPostGradu ? sPostGradu : '대학원을 선택해주세요.'}
          modalHandler={modalHandler}
          onClick={() => {
            setModalType('postgradu');
          }}
        />
        </BtnBox>
        <BtnBox>
        <div>학과 *</div>
        <ModalBtn
        type='seniorInfo'
          btnText={sMajor ? sMajor : '학과를 선택해주세요.'}
          modalHandler={modalHandler}
          onClick={() => {
            setModalType('major');
          }}
        />
        </BtnBox>
        {flag && (
          <SingleValidator
            msg={`${emptyPart}을 입력해주세요`}
            textColor="#FF0000"
          />
        )}
        <NextBtn  kind='route' btnText='다음' onClick={handleSubmit}/>
      </BtnContainer>
      {modal && portalElement
        ? createPortal(
            <RiseUpModal modalHandler={modalHandler} modalType={modalType} />,
            portalElement,
          )
        : null}
    </SeniorInfoPageContainer>
    </>
  );
}

export default SeniorInfoPage;

const SeniorInfoPageContainer = styled.div`
  width: inherit;
  height: 100%;
`;
const BtnBox = styled.div`
  margin-top: 1rem;
`
const SICBox = styled.div`
margin-bottom: 1.5rem;
margin-top: 1rem;
  width: 95%;
height: 5.9375rem;
flex-shrink: 0;
border-radius: 1rem;
background: #F8F9FA;
padding: 1.56rem 1rem;
margin-left: 0.56rem;
#info-content-msg{
  color: #868E96;
font-family: Pretendard;
font-size: 0.875rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.225rem */
letter-spacing: -0.03125rem;
}
`;

const BtnContainer = styled.div`
margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;
