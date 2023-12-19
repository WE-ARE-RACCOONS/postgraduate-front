'use client';
import SingleValidator from '@/components/Validator/SingleValidator';
import { PhoneNumContainer } from './PhoneNumForm.styled';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { phoneNum, phoneNumValidation } from '@/stores/signup';

function PhoneNumForm() {
  const [flag, setFlag] = useState(false); // 최초 입력 체크하는 flag
  const [firNum, setFirNum] = useState('');
  const [secNum, setSecNum] = useState('');
  const [thiNum, setThiNum] = useState('');
  const setFullNum = useSetAtom(phoneNum);
  const setValidation = useSetAtom(phoneNumValidation);
  let maxLength = 0;

  function checkLength(inputValue: string, maxLength: number) {
    return inputValue.slice(0, maxLength);
  }

  function filterInputNum(inputValue: string) {
    const filteredValue = inputValue.replace(/[^0-9]/g, '');
    return filteredValue;
  }

  function checkPhoneNum(e: React.ChangeEvent<HTMLInputElement>) {
    if (!flag) setFlag(true);
    maxLength = e.currentTarget.id.includes('fir') ? 3 : 4;
    e.currentTarget.value = filterInputNum(e.currentTarget.value);
    e.currentTarget.value = checkLength(e.currentTarget.value, maxLength);
    if (checkValidation()) {
      setFlag(false);
      setValidation(true);
    }
  }

  function checkValidation() {
    let isValid = true;

    if (typeof document !== undefined) {
      const firInput = document.getElementById(
        'phone-num-input-fir',
      ) as HTMLInputElement;
      const secInput = document.getElementById(
        'phone-num-input-sec',
      ) as HTMLInputElement;
      const thiInput = document.getElementById(
        'phone-num-input-thi',
      ) as HTMLInputElement;

      setFirNum(firInput.value);
      setSecNum(secInput.value);
      setThiNum(thiInput.value);

      if (firInput.value.length < 3) isValid = false;
      if (secInput.value.length < 4) isValid = false;
      if (thiInput.value.length < 4) isValid = false;
    }

    return isValid;
  }

  useEffect(() => {
    setFullNum(firNum + secNum + thiNum);
  }, [firNum, secNum, thiNum]);

  return (
    <div>
      <div>휴대폰 번호</div>
      <PhoneNumContainer>
        <input
          type="text"
          id="phone-num-input-fir"
          className="phone-num-input"
          onChange={(e) => checkPhoneNum(e)}
        />
        <div>-</div>
        <input
          type="text"
          id="phone-num-input-sec"
          className="phone-num-input"
          onChange={(e) => checkPhoneNum(e)}
        />
        <div>-</div>
        <input
          type="text"
          id="phone-num-input-thi"
          className="phone-num-input"
          onChange={(e) => checkPhoneNum(e)}
        />
      </PhoneNumContainer>
      {flag && (
        <SingleValidator
          textColor="#FF3347"
          msg="010-0000-0000의 형식으로 입력해주세요"
        />
      )}
    </div>
  );
}

export default PhoneNumForm;
