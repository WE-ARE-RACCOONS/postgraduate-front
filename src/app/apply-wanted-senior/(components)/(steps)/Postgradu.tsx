import styled from 'styled-components';
import { WISH_SENIOR_MENTOR_MSG } from '../../constant';
import { NextBtnBox, WishSeniorSubTitle, WishSeniorTitle } from '../(template)';
import { useAtomValue } from 'jotai';
import { overlay } from 'overlay-kit';
import NextBtn from '@/components/common/Button/NextBtn';
import { sPostGraduAtom } from '@/stores/senior';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import { TextFormEl } from '@/components/Form/TextForm/TextForm.styled';

export function WishSeniorPostGradu({
  onClick,
}: {
  onClick: (postgradu: string) => void;
}) {
  const postgradu = useAtomValue(sPostGraduAtom);

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
        <TextFormEl
          value={postgradu}
          placeholder={'ex.연세대학교'}
          onClick={() =>
            overlay.open(({ unmount }) => (
              <RiseUpModal modalType="postgradu" modalHandler={unmount} />
            ))
          }
        />
      </PostGraduWrapper>

      <NextBtnBox>
        <NextBtn
          btnText="다음"
          kind="route"
          onClick={() => onClick(postgradu)}
        />
      </NextBtnBox>
    </div>
  );
}

const PostGraduWrapper = styled.div`
  margin-top: 40px;
`;
