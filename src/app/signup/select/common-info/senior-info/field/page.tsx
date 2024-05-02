'use client';
import RiseUpModal from '@/components/Modal/RiseUpModal';
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
import { changeNickname, phoneNum } from '@/stores/signup';
import { ModalType } from '@/types/modal/riseUp';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import ProgressBar from '@/components/Bar/ProgressBar';
import findExCode from '@/utils/findExCode';
import { detectReload, preventClose } from '@/utils/reloadFun';

function SeniorInfoPage() {
  const [modalType, setModalType] = useState<ModalType>('postgradu');
  const [emptyPart, setEmptyPart] = useState('');
  const [flag, setFlag] = useState(false);
  const [ableSubmit, setAbleSubmit] = useState(false);
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
  const router = useRouter();
  const {
    getAccessToken,
    setAccessToken,
    setRefreshToken,
    setUserType,
    removeTokens,
  } = useAuth();
  const [socialId, setSocialId] = useState<number | null>(null);

  const phoneNumber = useAtomValue(phoneNum);
  const nickName = useAtomValue(changeNickname);
  const marketingReceive = useAtomValue(option);

  const certification = useAtomValue(photoUrlAtom);
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);
  const sLab = useAtomValue(sLabAtom);
  const sProfessor = useAtomValue(sProfessorAtom);
  const sField = useAtomValue(sFieldAtom);
  const sKeyword = useAtomValue(sKeywordAtom);

  useEffect(() => {
    if (typeof window !== undefined) {
      const socialId = window.localStorage.getItem('socialId');
      const socialIdNum = socialId ? parseInt(socialId) : null;
      setSocialId(socialIdNum);
    }
  }, []);

  useEffect(() => {
    detectReload();

    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  useEffect(() => {
    if (sField && sKeyword) {
      setFlag(false);
      setAbleSubmit(true);
    } else {
      setAbleSubmit(false);
    }
  }, [sField, sKeyword]);

  const fieldHandler = () => {
    setModalType('field');
    modalHandler();
  };

  const keywordHandler = () => {
    setModalType('keyword');
    modalHandler();
  };

  const formatField = (fields: string) => {
    return fields.replaceAll(',', ', ');
  };

  const formatKeyword = (keywords: string) => {
    const splittedKeywords = keywords.split(',');
    const resultArray = splittedKeywords.map((str) => '#' + str);
    return resultArray.join(', ');
  };

  const goChatLink = () => {
    router.push('/add-chat-link');
    return;
  };

  /* 기존 회원가입 함수 주석 처리
  const handleSubmit = () => {
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

    getAccessToken().then((token) => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (
        token &&
        sMajor &&
        sPostGradu &&
        sProfessor &&
        sLab &&
        sKeyword &&
        sField
      ) {
        // 후배 -> 선배 변경
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/senior/change/b`,
            {
              major: sMajor,
              postgradu: sPostGradu,
              professor: sProfessor,
              lab: sLab,
              field: sField,
              keyword: sKeyword,
            },
            {
              headers,
            },
          )
          .then((res) => {
            const response = res.data;

            if (findExCode(response.code)) {
              removeTokens();
              location.reload();
              return;
            }

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

      if (
        !token &&
        socialId &&
        phoneNumber &&
        nickName &&
        sMajor &&
        sPostGradu &&
        sProfessor &&
        sLab &&
        sKeyword &&
        sField
      ) {
        // 선배 최초 회원가입
        axios
          .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/senior/signup/b`, {
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
    });
  };
  */

  return (
    <>
      <div>
        <BackHeader headerText="정보입력" />
      </div>
      <ProgressBar totalNum={4} activeNum={2} />
      <SeniorInfoPageContainer>
        <h3>소속 중인 연구실에 대해 알려주세요.</h3>
        <SIFormTitleContainer>
          <SIFormTitle>
            <div className="si-form-title-text">연구분야&nbsp;</div>
            <div className="si-form-title-star">*</div>
          </SIFormTitle>
          {sField && <SIModifyBtn onClick={fieldHandler}>수정</SIModifyBtn>}
        </SIFormTitleContainer>
        <SIFormBox $isNotEmpty={sField ? true : false}>
          <div className="si-form-select-text">
            {sField ? formatField(sField) : `선택된 연구분야가 없습니다.`}
          </div>
          {!sField && <SIAddBtn onClick={fieldHandler}>+ 추가하기</SIAddBtn>}
        </SIFormBox>
        <SIFormTitleContainer>
          <SIFormTitle>
            <div className="si-form-title-text">연구주제&nbsp;</div>
            <div className="si-form-title-star">*</div>
          </SIFormTitle>
          {sKeyword && <SIModifyBtn onClick={keywordHandler}>수정</SIModifyBtn>}
        </SIFormTitleContainer>
        <SIFormBox $isNotEmpty={sKeyword ? true : false}>
          <div className="si-form-select-text">
            {sKeyword ? formatKeyword(sKeyword) : '선택된 연구주제가 없습니다.'}
          </div>
          {!sKeyword && (
            <SIAddBtn onClick={keywordHandler}>+ 추가하기</SIAddBtn>
          )}
        </SIFormBox>
        <SignupSubmitBtn $ableSubmit={ableSubmit} onClick={goChatLink}>
          다음으로
        </SignupSubmitBtn>
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
  padding: 0 1rem;
  position: relative;

  h3 {
    margin: 1.25rem 0 1rem 0;
  }
`;
const SICBox = styled.div`
  margin-top: 1rem;
  width: 95%;
  height: 5.9375rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #f8f9fa;
  padding: 1.56rem 1rem;
  margin-left: 0.56rem;
  #info-content-msg {
    color: #868e96;
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

const SIFormTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SIFormTitle = styled.div`
  display: flex;
  font-size: 14px;

  .si-form-title-text {
    color: #212529;
  }

  .si-form-title-star {
    color: #00a0e1;
    font-weight: 700;
  }
`;

const SIModifyBtn = styled.button`
  font-size: 14px;
  font-family: Pretendard;
  color: #00a0e1;
  background-color: transparent;
  border: none;
  line-height: 140%;
  text-decoration-line: underline;
  cursor: pointer;
`;

const SIFormBox = styled.div<{ $isNotEmpty: boolean }>`
  width: 100%;
  height: 3.25rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 2.625rem;
  align-items: center;

  .si-form-select-text {
    color: ${(props) => (props.$isNotEmpty ? '#495565' : '#ADB5BD')};
  }
`;

const SIAddBtn = styled.button`
  width: 4.375rem;
  height: 1.75rem;
  font-size: 12px;
  font-weight: 700;
  font-family: Pretendard;
  border-radius: 4px;
  background-color: #495565;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const SignupSubmitBtn = styled.button<{ $ableSubmit: boolean }>`
  width: 95%;
  height: 3.375rem;
  border-radius: 12px;
  border: none;
  background-color: ${(props) => (props.$ableSubmit ? '#2FC4B2' : '#ADB5BD')};
  color: #fff;
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 700;
  cursor: ${(props) => (props.$ableSubmit ? 'pointer' : 'default')};
  position: absolute;
  top: 27rem;
  left: 50%;
  transform: translateX(-50%);
`;
