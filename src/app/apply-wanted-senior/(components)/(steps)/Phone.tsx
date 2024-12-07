import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import NextBtn from '@/components/comon/Button/NextBtn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneNumSchema } from '@/components/Form/PhoneNumForm/phoneNumSchema';
import TextForm from '@/components/Form/TextForm';
import SingleValidator from '@/components/comon/SingleValidator';
import { useEffect } from 'react';

export function WishSeniorPhoneNum({
  onClick,
}: {
  onClick: (phoneNum: string) => void;
}) {
  const {
    register,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      phoneNum: '',
    },
    mode: 'onChange',
    resolver: yupResolver(phoneNumSchema),
  });

  useEffect(() => {
    trigger();
  }, []);
  return (
    <div style={{ margin: '1.6rem 1rem' }}>
      <WishSeniorTitle>{WISH_SENIOR_MENTOR_MSG.PHONE.TITLE}</WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        {WISH_SENIOR_MENTOR_MSG.PHONE.SUB_TITLE}
      </WishSeniorSubTitle>

      <LabWrapper>
        <TextForm
          targetAtom={''}
          placeholder={'01012345678'}
          register={register('phoneNum')}
          aria-label="전화번호 입력"
          aria-invalid={!!errors.phoneNum}
        />
        {errors.phoneNum?.message && (
          <SingleValidator
            textColor="#FF3347"
            msg={errors.phoneNum.message}
            aria-live="polite"
          />
        )}
      </LabWrapper>

      <NextBtnBox>
        <NextBtn
          btnText="신청 완료"
          kind={errors.phoneNum?.message ? 'route-non' : 'route'}
          onClick={() => onClick(getValues('phoneNum'))}
        />
      </NextBtnBox>
    </div>
  );
}

const LabWrapper = styled.div`
  margin-top: 40px;
`;
