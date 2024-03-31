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

function MatchingInfoPage() {
  const router = useRouter();
  const setDesiredSchool = useSetAtom(desiredSchool);
  const setDesiredField = useSetAtom(desiredField);
  const schoolCharCount = useAtomValue(desiredSchoolLen);
  const fieldCharCount = useAtomValue(desiredFieldLen);
  const [matchingReceive, setMatchingReceive] = useAtom(matchingReceiveAtom);

  useEffect(() => {
    if (detectReload()) {
      router.replace('/signup/select');
    }

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
          김선배가 딱 맞는 선배를 찾아드려요
        </h3>
        <MIFont>
          찾고 있는 대학원 선배에 대해 알려주시면
          <br />
          김선배가 딱 맞는 선배가 있을 때 문자 드려요!
        </MIFont>
        <MatchingForm
          title="희망 대학원/학과"
          isRequired={false}
          maxLength={50}
          placeholder={`예시)연세대학원/컴퓨터과학과\n카이스트 대학원/생명화학공학과`}
          handler={setDesiredSchool}
          charCount={schoolCharCount}
        />
        <MatchingForm
          title="희망 연구분야"
          isRequired={false}
          maxLength={50}
          placeholder={`예시)나노 소재/디스플레이/ 반도체소자`}
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
          <MILabel>(선택) 나에게 맞는 멘토링을 문자로 추천 받아볼래요!</MILabel>
        </div>
        {schoolCharCount && fieldCharCount ? (
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
