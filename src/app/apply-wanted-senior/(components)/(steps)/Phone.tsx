import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import NextBtn from '@/components/Button/NextBtn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneNumSchema } from '@/components/SingleForm/PhoneNumForm/phoneNumSchema';
import TextForm from '@/components/SingleForm/TextForm';
import SingleValidator from '@/components/Validator/SingleValidator';

export function WishSeniorPhoneNum({
  onClick,
}: {
  onClick: (phoneNum: string) => void;
}) {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNum: '',
    },
    mode: 'onChange',
    resolver: yupResolver(phoneNumSchema),
  });

  return (
    <div style={{ margin: '1.6rem 1rem' }}>
      <WishSeniorTitle>{WISH_SENIOR_MENTOR_MSG.PHONE.TITLE}</WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        {WISH_SENIOR_MENTOR_MSG.PHONE.SUB_TITLE}
      </WishSeniorSubTitle>

      <LabWrapper>
        <TextForm
          targetAtom={'phone'}
          placeholder="전화번호를 입력해 주세요 (예: 01012345678)"
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
          kind={
            errors.phoneNum?.message || watch('phoneNum').length === 0
              ? 'route-non'
              : 'route'
          }
          onClick={() => onClick(getValues('phoneNum'))}
        />
      </NextBtnBox>
    </div>
  );
}

const LabWrapper = styled.div`
  margin-top: 40px;
`;
