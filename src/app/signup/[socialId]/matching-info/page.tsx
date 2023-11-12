'use client';
import SignUpBtn from '@/components/Button/SignUpBtn';
import MatchingForm from '@/components/SingleForm/MatchingForm';
import {
  desiredField,
  desiredFieldLen,
  desiredSchool,
  desiredSchoolLen,
  matchingReceiveAtom,
} from '@/stores/matching';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

function MatchingInfoPage() {
  const setDesiredSchool = useSetAtom(desiredSchool);
  const setDesiredField = useSetAtom(desiredField);
  const schoolCharCount = useAtomValue(desiredSchoolLen);
  const fieldCharCount = useAtomValue(desiredFieldLen);
  const [matchingReceive, setMatchingReceive] = useAtom(matchingReceiveAtom);

  return (
    <div>
      <h3>김선배가 딱 맞는 선배를 찾아드려요</h3>
      <div>
        찾고 있는 대학원 선배에 대해 알려주시면
        <br />
        김선배가 딱 맞는 선배가 있을 때 문자 드려요!
      </div>
      <MatchingForm
        title="희망 대학원/학과"
        isRequired={false}
        maxLength={50}
        placeholder={`예시)\n연세대학원 / 컴퓨터과학과\n카이스트 대학원 / 생명화학공학과`}
        handler={setDesiredSchool}
        charCount={schoolCharCount}
      />
      <MatchingForm
        title="희망 연구분야"
        isRequired={false}
        maxLength={50}
        placeholder={`예시)\n나노 소재 / 디스플레이 / 반도체소자`}
        handler={setDesiredField}
        charCount={fieldCharCount}
      />
      <input
        type="checkbox"
        name="agreement"
        id="msg-agreement"
        onChange={() => {
          setMatchingReceive(!matchingReceive);
        }}
      />
      <label htmlFor="msg-agreement">
        (선택) 나에게 맞는 대학원 선배를 문자로 받아볼래요
      </label>
      <SignUpBtn />
    </div>
  );
}

export default MatchingInfoPage;
