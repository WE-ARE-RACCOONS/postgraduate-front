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
import {
  nickname,
  phoneNum,
  socialIdAtom,
  userTypeAtom,
} from '@/stores/signup';
import { ModalType } from '@/types/modal/riseUp';
import axios from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import ProgressBar from '@/components/Bar/ProgressBar';

function SeniorInfoPage() {
  const [modalType, setModalType] = useState<ModalType>('postgradu');
  const [emptyPart, setEmptyPart] = useState('');
  const [flag, setFlag] = useState(false);
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
  const router = useRouter();
  const currentPath = usePathname();
  // const pathArr = currentPath.split('/');
  // const socialId = pathArr[2];
  const socialId = useAtomValue(socialIdAtom);
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);
  const sLab = useAtomValue(sLabAtom);
  const sProfessor = useAtomValue(sProfessorAtom);
  const sField = useAtomValue(sFieldAtom);
  const sKeyword = useAtomValue(sKeywordAtom);
  useEffect(() => {
    if (sPostGradu && sMajor && sLab && sProfessor && sField && sKeyword)
      setFlag(false);
  }, [sPostGradu, sMajor, sLab, sProfessor, sField, sKeyword]);

  const handleSubmit = () => {
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

    setFlag(false);
    router.push(`/signup/select/common-info/senior-info/field`);
  };

  return (
    <>
      <div>
        <BackHeader headerText="정보입력" />
        <ProgressBar activeNum={1} />
      </div>
      <SeniorInfoPageContainer>
        <BtnContainer>
          <h3>연구실 정보를 알려주세요.</h3>
          <BtnBox>
            <MBtnFont>
              지도교수님&nbsp;<div id="font-color">*</div>
            </MBtnFont>
            <TextForm
              max={5}
              placeholder="지도교수님 성함을 입력해주세요."
              targetAtom="lab"
            />
          </BtnBox>
          <BtnBox>
            <MBtnFont>
              연구실명&nbsp;<div id="font-color">*</div>
            </MBtnFont>
            <TextForm
              max={30}
              placeholder="연구실 이름을 입력해주세요."
              targetAtom="professor"
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
        {sLab && sProfessor ? (
          <NextBtn kind="route" btnText="다음" onClick={handleSubmit} />
        ) : (
          <NextBtn kind="route-non" btnText="다음" />
        )}
      </SeniorInfoPageContainer>
    </>
  );
}

export default SeniorInfoPage;
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
  margin-bottom: 15rem;
  margin-top: 1.25rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;
