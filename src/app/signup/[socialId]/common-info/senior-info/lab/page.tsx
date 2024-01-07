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

  const phoneNumber = useAtomValue(phoneNum);
  const nickName = useAtomValue(nickname);
  const marketingReceive = useAtomValue(option);

  const certification = useAtomValue(photoUrlAtom);
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);
  const sLab = useAtomValue(sLabAtom);
  const sProfessor = useAtomValue(sProfessorAtom);
  const sField = useAtomValue(sFieldAtom);
  const sKeyword = useAtomValue(sKeywordAtom);
  const headers = {
    Authorization: `Bearer ${Token}`,
  };
  useEffect(() => {
    if (sPostGradu && sMajor && sLab && sProfessor && sField && sKeyword)
      setFlag(false);
  }, [sPostGradu, sMajor, sLab, sProfessor, sField, sKeyword]);
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

    if (!sLab) {
      setFlag(true);
      setEmptyPart('연구실명');
      return;
    }

    if (!sProfessor) {
      setFlag(true);
      setEmptyPart('지도 교수님');
      return;
    }

    if (!sField) {
      setFlag(true);
      setEmptyPart('연구분야');
      return;
    }

    if (!sKeyword) {
      setFlag(true);
      setEmptyPart('연구 주제 키워드');
      return;
    }
    setFlag(false);
    if (Token && certification) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/senior/change`,
          {
            major: sMajor,
            postgradu: sPostGradu,
            professor: sProfessor,
            lab: sLab,
            field: sField,
            keyword: sKeyword,
            certification: certification,
          },
          {
            headers,
          },
        )
        .then((res) => {
          const response = res.data;
          if (response.code == 'SNR202') {
            setAccessToken({
              token: response.data.accessToken,
              expires: response.data.accessExpiration,
            });
            setRefreshToken({
              token: response.data.refreshToken,
              expires: response.data.refreshExpiration,
            });
            setUserType(response.data.role);
            router.push('/signup/done');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (socialId && phoneNumber && nickName && certification) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/senior/signup`, {
          socialId: socialId,
          phoneNumber: phoneNumber,
          nickName: nickName,
          marketingReceive: marketingReceive,
          major: sMajor,
          postgradu: sPostGradu,
          professor: sProfessor,
          lab: sLab,
          field: sField,
          keyword: sKeyword,
          certification: certification,
        })
        .then((res) => {
          const response = res.data;
          if (response.code == 'SNR202') {
            setAccessToken({
              token: response.data.accessToken,
              expires: response.data.accessExpiration,
            });
            setRefreshToken({
              token: response.data.refreshToken,
              expires: response.data.refreshExpiration,
            });
            setUserType(response.data.role);
            router.push('/signup/done');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

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
        <ModalBtn
        type='seniorInfo'
          btnText={sPostGradu ? sPostGradu : '대학원을 선택해주세요.'}
          modalHandler={modalHandler}
          onClick={() => {
            setModalType('postgradu');
          }}
        />
        <ModalBtn
        type='seniorInfo'
          btnText={sMajor ? sMajor : '학과를 선택해주세요.'}
          modalHandler={modalHandler}
          onClick={() => {
            setModalType('major');
          }}
        />
        <TextForm placeholder="연구실명*" targetAtom="lab" />
        <TextForm placeholder="지도 교수님*" targetAtom="professor" />
        <ModalBtn
        type='seniorInfo'
          btnText={sField ? sField : '연구분야*'}
          modalHandler={modalHandler}
          onClick={() => {
            setModalType('field');
          }}
        />
        <ModalBtn
        type='seniorInfo'
          btnText={sKeyword ? sKeyword : '연구 주제 키워드*'}
          modalHandler={modalHandler}
          onClick={() => {
            setModalType('keyword');
          }}
        />
        {flag && (
          <SingleValidator
            msg={`${emptyPart}을 입력해주세요`}
            textColor="#FF0000"
          />
        )}
        <button onClick={handleSubmit}>다음</button>
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
const SICBox = styled.div`
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
  display: flex;
  flex-direction: column;
`;