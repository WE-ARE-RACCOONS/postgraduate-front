'use client';
import ModalBtn from '@/components/Button/ModalBtn';
import NextBtn from '@/components/Button/NextBtn';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import SingleValidator from '@/components/Validator/SingleValidator';
import useModal from '@/hooks/useModal';
import { sMajorAtom, sPostGraduAtom } from '@/stores/senior';
import { ModalType } from '@/types/modal/riseUp';
import { useAtomValue } from 'jotai';
import { overlay } from 'overlay-kit';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import ProgressBar from '@/components/Bar/ProgressBar';
import { detectReload, preventClose } from '@/utils/reloadFun';
import { SENIOR_MAJOR } from '@/constants/signup/senior';

function SeniorInfoPage() {
  const [modalType, setModalType] = useState<ModalType>('postgradu');
  const [emptyPart, setEmptyPart] = useState('');
  const [flag, setFlag] = useState(false);
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
  const router = useRouter();
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);

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
    if (sPostGradu && sMajor) setFlag(false);
  }, [sPostGradu, sMajor]);

  const handleSubmit = () => {
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
    router.push(`/signup/select/common-info/senior-info/lab`);
  };

  return (
    <>
      <div>
        <BackHeader headerText="정보입력" />
        <ProgressBar totalNum={4} activeNum={0} />
      </div>
      <SeniorInfoPageContainer>
        <SICBox>
          <h3>{SENIOR_MAJOR.seniorInfoTitle}</h3>
          <div id="info-content-msg">{SENIOR_MAJOR.seniorInfoUsage}</div>
        </SICBox>
        <BtnContainer>
          <h3>{SENIOR_MAJOR.graduateSchoolTitle}</h3>
          <BtnBox>
            <MBtnFont>
              {SENIOR_MAJOR.graduateSchool}&nbsp;<div id="font-color">*</div>
            </MBtnFont>
            <ModalBtn
              $isGet={!sPostGradu}
              type="seniorInfo"
              btnText={
                sPostGradu ? sPostGradu : SENIOR_MAJOR.graduateSchoolPlaceholder
              }
              modalHandler={modalHandler}
              onClick={() => {
                setModalType('postgradu');
              }}
            />
          </BtnBox>
          <BtnBox>
            <MBtnFont>
              {SENIOR_MAJOR.major}&nbsp;<div id="font-color">*</div>
            </MBtnFont>
            <ModalBtn
              $isGet={!sMajor}
              type="seniorInfo"
              btnText={sMajor ? sMajor : SENIOR_MAJOR.majorPlaceholder}
              modalHandler={modalHandler}
              onClick={() => {
                setModalType('major');
              }}
            />
          </BtnBox>
          <div style={{ marginTop: '0.5rem' }}>
            {flag && (
              <SingleValidator
                msg={`${emptyPart}을 입력해주세요`}
                textColor="#FF3347"
              />
            )}
          </div>
        </BtnContainer>
        {sPostGradu && sMajor ? (
          <NextBtn kind="route" btnText="다음" onClick={handleSubmit} />
        ) : (
          <NextBtn kind="route-non" btnText="다음" />
        )}
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
const MBtnFont = styled.div`
  display: flex;
  color: #212529;
  font-family: Noto Sans JP;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  #font-color {
    color: #00a0e1;
    font-family: Noto Sans JP;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const BtnBox = styled.div`
  margin-top: 1rem;
`;
const SICBox = styled.div`
  margin-bottom: 1.5rem;
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
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 8rem;
`;
