'use client';
import SingleValidator from '@/components/Validator/SingleValidator';
import { PhoneNumContainer, NumFont } from './PhoneNumForm.styled';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { phoneNum, phoneNumValidation } from '@/stores/signup';

function PhoneNumForm({ defaultValue }: { defaultValue?: string }) {
  const [flag, setFlag] = useState(false); // 최초 입력 체크하는 flag
  const [fullNum, setFullNum] = useAtom(phoneNum);
  const [availability, setValidation] = useAtom(phoneNumValidation);

  useEffect(() => {
    if (fullNum) {
      const inputForm = document.getElementById(
        'phone-num-input',
      ) as HTMLInputElement;
      if (inputForm) inputForm.value = fullNum;
    }
  }, []);

  function checkPhoneNum(e: React.ChangeEvent<HTMLInputElement>) {
    if (!flag) setFlag(true);

    if (checkValidation(e.currentTarget.value)) {
      setFlag(false);
      setValidation(true);
    } else {
      setFlag(true);
      setValidation(false);
    }
  }

  function checkValidation(testStr: string) {
    const numberPattern = /^[0-9]+$/;
    if (!numberPattern.test(testStr)) {
      return false;
    }

    if (testStr.length !== 11) {
      return false;
    }

    if (testStr.substring(0, 3) !== '010') {
      return false;
    }

    return true;
  }

  return (
    <div>
      <div style={{ marginLeft: '0.75rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <NumFont>휴대폰 번호</NumFont>
          {flag && (
            <SingleValidator
              textColor="#FF3347"
              msg="올바르지 않은 휴대폰 번호입니다."
            />
          )}
          {!flag && availability && (
            <SingleValidator
              textColor="#00A0E1"
              msg="올바른 휴대폰 번호입니다."
            />
          )}
        </div>
        <PhoneNumContainer>
          <input
            type="text"
            id="phone-num-input"
            className="phone-num-input"
            placeholder="숫자만 입력"
            defaultValue={defaultValue || ''}
            maxLength={11}
            onChange={(e) => {
              setFullNum(e.currentTarget.value);
              checkPhoneNum(e);
            }}
            // onBlur={(e) => {
            //   checkPhoneNum(e);
            // }}
          />
        </PhoneNumContainer>
      </div>
    </div>
  );
}

export default PhoneNumForm;
