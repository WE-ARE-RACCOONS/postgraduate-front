import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import TextForm from '@/components/SingleForm/TextForm';
import { useForm } from 'react-hook-form';
import NextBtn from '@/components/Button/NextBtn';

export function WishSeniorProfessor({
  onClick,
}: {
  onClick: (professor: string) => void;
}) {
  const { register, watch } = useForm({
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
          kind={watch('professor').length > 0 ? 'route' : 'route-non'}
          onClick={() => onClick(watch('professor'))}
        />
      </NextBtnBox>
    </div>
  );
}

const ProfessorWrapper = styled.div`
  margin-top: 40px;
`;
