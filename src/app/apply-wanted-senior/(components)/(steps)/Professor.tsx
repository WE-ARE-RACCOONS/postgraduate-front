import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import TextForm from '@/components/Form/TextForm';
import { useForm } from 'react-hook-form';
import NextBtn from '@/components/comon/Button/NextBtn';

export function WishSeniorProfessor({
  onClick,
}: {
  onClick: (professor: string) => void;
}) {
  const { register, getValues } = useForm({
    defaultValues: {
      professor: '',
    },
    mode: 'onChange',
  });

  return (
    <div style={{ margin: '1.6rem 1rem' }}>
      <WishSeniorTitle>
        {WISH_SENIOR_MENTOR_MSG.PROFESSOR.TITLE}
      </WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        {WISH_SENIOR_MENTOR_MSG.PROFESSOR.SUB_TITLE}
      </WishSeniorSubTitle>

      <ProfessorWrapper>
        <TextForm
          targetAtom={''}
          placeholder={'ex.김OO교수님'}
          register={register('professor')}
        />
      </ProfessorWrapper>

      <NextBtnBox>
        <NextBtn
          btnText="다음"
          kind="route"
          onClick={() => onClick(getValues('professor'))}
        />
      </NextBtnBox>
    </div>
  );
}

const ProfessorWrapper = styled.div`
  margin-top: 40px;
`;
