'use client';
import SingleValidator from '@/components/Validator/SingleValidator';
import { PhoneNumContainer, NumFont } from './PhoneNumForm.styled';
import { useState } from 'react';
import { useSetAtom, useAtom } from 'jotai';
import { phoneNum, phoneNumValidation } from '@/stores/signup';

function PhoneNumForm({ defaultValue }: { defaultValue?: string }) {
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

    if (fullNum.length !== 11) {
      return false;
    }

    if (fullNum.substring(0, 3) !== '010') {
      return false;
    }

    return isValid;
  }

  return (
    <div>
      <div
        style={{ marginLeft: '0.75rem', marginTop: '1.5rem'}}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <NumFont>휴대폰 번호</NumFont>
          {flag && (
            <SingleValidator
              textColor="#FF3347"
              msg="올바르지 않은 휴대폰 번호입니다"
            />
          )}
        </div>
        <PhoneNumContainer flag={flag}>
          <input
            type="text"
            id="phone-num-input"
            className="phone-num-input"
            placeholder="숫자만 입력"
            defaultValue={defaultValue || ''}
            onChange={(e) => {
              setFullNum(e.currentTarget.value);
            }}
            onBlur={(e) => {
              checkPhoneNum(e);
            }}
          />
        </PhoneNumContainer>
      </div>
    </div>
  );
}

export default PhoneNumForm;
