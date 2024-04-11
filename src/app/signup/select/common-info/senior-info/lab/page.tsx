'use client';
import NextBtn from '@/components/Button/NextBtn';
import TextForm from '@/components/SingleForm/TextForm';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  sFieldAtom,
  sKeywordAtom,
  sLabAtom,
  sMajorAtom,
  sPostGraduAtom,
  sProfessorAtom,
} from '@/stores/senior';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import ProgressBar from '@/components/Bar/ProgressBar';
import { detectReload, preventClose } from '@/utils/reloadFun';
import GoogleAnalytics from '@/components/GA/GA';

function SeniorInfoPage() {
  const [emptyPart, setEmptyPart] = useState('');
  const [flag, setFlag] = useState(false);
  const router = useRouter();
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);
  const sLab = useAtomValue(sLabAtom);
  const sProfessor = useAtomValue(sProfessorAtom);
  const sField = useAtomValue(sFieldAtom);
  const sKeyword = useAtomValue(sKeywordAtom);

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
      <GoogleAnalytics />
      <div>
        <BackHeader headerText="정보입력" />
        <ProgressBar totalNum={4} activeNum={2} />
      </div>
      <SeniorInfoPageContainer>
        <BtnContainer>
          <h3>연구실 정보를 알려주세요.</h3>
          <BtnBox>
            <MBtnFont>
              지도교수님&nbsp;<div id="font-color">*</div>
            </MBtnFont>
            <TextForm
              max={10}
              placeholder="지도교수님 성함을 입력해주세요."
              targetAtom="professor"
            />
          </BtnBox>
          <BtnBox>
            <MBtnFont>
              연구실명&nbsp;<div id="font-color">*</div>
            </MBtnFont>
            <TextForm
              max={30}
              placeholder="연구실 이름을 입력해주세요."
              targetAtom="lab"
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
