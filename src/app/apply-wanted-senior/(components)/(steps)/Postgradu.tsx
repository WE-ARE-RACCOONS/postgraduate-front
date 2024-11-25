import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import TextForm from '@/components/SingleForm/TextForm';
import { useForm } from 'react-hook-form';
import NextBtn from '@/components/Button/NextBtn';

export function WishSeniorPostGradu({
  onClick,
}: {
  onClick: (postgradu: string) => void;
}) {
  const { register, getValues } = useForm({
    defaultValues: {
      postgradu: '',
    },
    mode: 'onChange',
  });

  return (
    <div style={{ margin: '1.6rem 1rem' }}>
      <WishSeniorTitle>
        {WISH_SENIOR_MENTOR_MSG.POSTGRADU.TITLE}
      </WishSeniorTitle>
      <br />
      <WishSeniorSubTitle>
        {WISH_SENIOR_MENTOR_MSG.POSTGRADU.SUB_TITLE}
      </WishSeniorSubTitle>

      <PostGraduWrapper>
        <TextForm
          targetAtom={''}
          placeholder={'ex.연세대학교'}
          register={register('postgradu')}
        />
      </PostGraduWrapper>

      <NextBtnBox>
        <NextBtn
          btnText="다음"
          kind="route"
          onClick={() => onClick(getValues('postgradu'))}
        />
      </NextBtnBox>
    </div>
  );
}

const PostGraduWrapper = styled.div`
  margin-top: 40px;
`;
