import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import TextForm from '@/components/Form/TextForm';
import { useForm } from 'react-hook-form';
import NextBtn from '@/components/common/Button/NextBtn';

export function WishSeniorLab({ onClick }: { onClick: (lab: string) => void }) {
  const { register, getValues } = useForm({
    defaultValues: {
      lab: '',
    },
    mode: 'onChange',
  });

  return (
    <div style={{ margin: '1.6rem 1rem' }}>
      <WishSeniorTitle>{WISH_SENIOR_MENTOR_MSG.LAB.TITLE}</WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        {WISH_SENIOR_MENTOR_MSG.LAB.SUB_TITLE}
      </WishSeniorSubTitle>

      <LabWrapper>
        <TextForm
          targetAtom={''}
          placeholder={'ex.도시설계연구실'}
          register={register('lab')}
        />
      </LabWrapper>

      <NextBtnBox>
        <NextBtn
          btnText="다음"
          kind="route"
          onClick={() => onClick(getValues('lab'))}
        />
      </NextBtnBox>
    </div>
  );
}

const LabWrapper = styled.div`
  margin-top: 40px;
`;
