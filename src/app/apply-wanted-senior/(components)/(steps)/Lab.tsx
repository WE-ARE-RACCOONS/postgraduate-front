import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import TextForm from '@/components/SingleForm/TextForm';
import { useForm } from 'react-hook-form';
import NextBtn from '@/components/Button/NextBtn';

export function WishSeniorLab({ onClick }: { onClick: (lab: string) => void }) {
  const { register, getValues, watch } = useForm({
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
          kind={watch('lab').length > 0 ? 'route' : 'route-non'}
          onClick={() => onClick(watch('lab'))}
        />
      </NextBtnBox>
    </div>
  );
}

const LabWrapper = styled.div`
  margin-top: 40px;
`;
