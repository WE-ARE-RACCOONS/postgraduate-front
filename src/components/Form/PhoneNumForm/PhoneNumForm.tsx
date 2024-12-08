'use client';
import SingleValidator from '@/components/common/SingleValidator';
import { PhoneNumContainer, NumFont } from './PhoneNumForm.styled';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { phoneNum, phoneNumValidation } from '@/stores/signup';
import { phoneNumSchema } from './phoneNumSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  phoneNum: string;
}

function PhoneNumForm({ defaultValue }: { defaultValue?: string }) {
  const [fullNum, setFullNum] = useAtom(phoneNum);
  const [availability, setAvailability] = useAtom(phoneNumValidation);
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(phoneNumSchema),
    defaultValues: {
      phoneNum: defaultValue ?? '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (fullNum) {
      const inputForm = document.getElementById(
        'phone-num-input',
      ) as HTMLInputElement;
      if (inputForm) inputForm.value = fullNum;
    }
  }, []);

  return (
    <div>
      <div style={{ marginLeft: '0.75rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <NumFont>휴대폰 번호</NumFont>
          {errors.phoneNum?.message && (
            <SingleValidator
              textColor="#FF3347"
              msg={errors.phoneNum.message}
            />
          )}
          {typeof errors.phoneNum?.message === 'undefined' && availability && (
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
            defaultValue={defaultValue ?? fullNum ?? ''}
            {...register('phoneNum')}
            onChange={(e) => {
              register('phoneNum').onChange(e);
              setFullNum(e.target.value);
            }}
            onBlur={(e) => {
              register('phoneNum').onBlur(e);
              setAvailability(errors.phoneNum?.message ? false : true);
            }}
          />
        </PhoneNumContainer>
      </div>
    </div>
  );
}

export default PhoneNumForm;
