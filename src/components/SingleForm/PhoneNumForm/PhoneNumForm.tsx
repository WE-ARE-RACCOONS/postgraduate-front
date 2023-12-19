'use client';
import SingleValidator from '@/components/Validator/SingleValidator';
import { PhoneNumContainer } from './PhoneNumForm.styled';
import { useEffect, useState } from 'react';
import { useSetAtom, useAtom } from 'jotai';
import { phoneNum, phoneNumValidation } from '@/stores/signup';

function PhoneNumForm() {
  const [flag, setFlag] = useState(false); // 최초 입력 체크하는 flag
  const [fullNum, setFullNum] = useAtom(phoneNum);
  const setValidation = useSetAtom(phoneNumValidation);

  function checkPhoneNum(e: React.ChangeEvent<HTMLInputElement>) {
    if (!flag) setFlag(true);
    if (checkValidation()) {
      setFlag(false);
      setValidation(true);
    }
  }

  function checkValidation() {
    let isValid = true;

    const numberPattern = /^[0-9]+$/;
    if (!numberPattern.test(fullNum)) {
      return false;
    }

    // 전화번호가 11자리인지 확인
    if (fullNum.length !== 11) {
      return false;
    }

    // 010으로 시작하는지 확인
    if (fullNum.substring(0, 3) !== '010') {
      return false;
    }

    return isValid;
  }

  return (
    <div>
      <div>휴대폰 번호</div>
      <PhoneNumContainer>
        <input type='text' id='phone-num-input' className='phone-num-input' onChange={(e) => {setFullNum(e.currentTarget.value)}} onBlur={(e) => {checkPhoneNum(e)}} />
      </PhoneNumContainer>
      {flag && (
        <SingleValidator
          textColor="#FF3347"
          msg="01012345678 형식으로 입력해주세요"
        />
      )}
    </div>
  );
}

export default PhoneNumForm;
