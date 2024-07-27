'use client';
import SignUpBtn from '@/components/Button/SignUpBtn';
import BackHeader from '@/components/Header/BackHeader';
import MatchingForm from '@/components/SingleForm/MatchingForm';
import styled from 'styled-components';
import {
  desiredField,
  desiredFieldLen,
  desiredSchool,
  desiredSchoolLen,
  matchingReceiveAtom,
} from '@/stores/matching';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import CheckBox from '@/components/Checkbox';
import NextBtn from '@/components/Button/NextBtn';
import { useEffect } from 'react';
import { detectReload, preventClose } from '@/utils/reloadFun';
import { useRouter } from 'next/navigation';
import { JUNIOR_MATCHING } from '@/constants/signup/junior';

function MatchingInfoPage() {
  const router = useRouter();
  const setDesiredSchool = useSetAtom(desiredSchool);
  const setDesiredField = useSetAtom(desiredField);
  const schoolCharCount = useAtomValue(desiredSchoolLen);
  const fieldCharCount = useAtomValue(desiredFieldLen);
  const [matchingReceive, setMatchingReceive] = useAtom(matchingReceiveAtom);

  useEffect(() => {
    detectReload();

    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  const handleMatchingReceive = () => {
    setMatchingReceive(!matchingReceive);
  };

  return (
    <div>
      <div style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)' }}>
        <BackHeader headerText="회원가입" />
      </div>
      <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>
          {JUNIOR_MATCHING.matchingTitle}
        </h3>
        <MIFont>
          {JUNIOR_MATCHING.matchingDescFir}
          <br />
          {JUNIOR_MATCHING.matchingDescSec}
        </MIFont>
        <MatchingForm
          title={JUNIOR_MATCHING.desiredSchoolTitle}
          isRequired={false}
          maxLength={50}
          placeholder={JUNIOR_MATCHING.desiredSchoolPlaceholder}
          handler={setDesiredSchool}
          charCount={schoolCharCount}
        />
        <MatchingForm
          title={JUNIOR_MATCHING.desiredFieldTitle}
          isRequired={false}
          maxLength={60}
          placeholder={JUNIOR_MATCHING.desiredFieldPlaceholder}
          handler={setDesiredField}
          charCount={fieldCharCount}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
        >
          <CheckBox
            type="accept"
            checked={matchingReceive}
            onChange={handleMatchingReceive}
          />
          <MILabel>{JUNIOR_MATCHING.matchingReceiveText}</MILabel>
        </div>
        {(matchingReceive ? schoolCharCount && fieldCharCount : true) ? (
          <SignUpBtn />
        ) : (
          <NextBtn kind="route-non-matching" btnText="가입완료 하기" />
        )}
      </div>
    </div>
  );
}
const MIFont = styled.div`
  margin-bottom: 2.31rem;
  color: #868e96;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.03125rem;
`;

const MILabel = styled.label`
  margin-bottom: 0.3rem;
  color: #212529;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export default MatchingInfoPage;
