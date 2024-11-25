import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../../page';
import NextBtn from '@/components/Button/NextBtn';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneNumSchema } from '@/components/SingleForm/PhoneNumForm/phoneNumSchema';
import TextForm from '@/components/SingleForm/TextForm';

export function WishSeniorPhoneNum({
  onClick,
}: {
  onClick: (phoneNum: string) => void;
}) {
  const { register, getValues } = useForm({
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
          targetAtom={''}
          placeholder={'010-1234-5677'}
          register={register('phoneNum')}
        />
      </LabWrapper>

      <NextBtnBox>
        <NextBtn
          btnText="신청 완료"
          kind="route"
          onClick={() => onClick(getValues('phoneNum'))}
        />
      </NextBtnBox>
    </div>
  );
}

const LabWrapper = styled.div`
  margin-top: 40px;
`;
