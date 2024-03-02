import { MBestCaseContainer } from './MBestCaseContent.styled';
import Image from 'next/image';
import x_icon from '../../../../public/x.png';
import user_img from '../../../../public/user.png';
import RoundedImage from '@/components/Image/RoundedImage';
import DividedText from '@/components/Text/DividedText';
import AuthLabeledText from '@/components/Text/AuthLabeledText';
import BorderedText from '@/components/Text/BorderedText';
import TextField from '@/components/Text/TextField';

function MBestCaseContent({ modalHandler }: { modalHandler: () => void }) {
  return (
    <MBestCaseContainer>
      <div style={{ display: 'flex' }}>
        <h3 style={{ marginLeft: '38%', marginTop: '1rem' }}>프로필 예시</h3>
        <Image
          id="x-icon"
          src={x_icon}
          alt="닫기 버튼"
          sizes="(max-width: 600px) 3.rem"
          priority
          onClick={modalHandler}
        />
      </div>
      <RoundedImage imgSrc={user_img} altMsg="선배 프로필 이미지" />
      <DividedText firStr="대학원" secStr="학과" />
      <AuthLabeledText str="닉네임" />
      <div id="keyword-container">
        <BorderedText str="김선배 대학원" />
        <BorderedText str="김선배 카이스트 학과" />
        <BorderedText str="김선배 카이스트 연구실" />
        <BorderedText str="김선배 교수님" />
      </div>
      <div id="tag-container">
        <div className="profile-tag">#멘토링 1회</div>
        <div className="profile-tag">#리뷰 1회</div>
        <div className="profile-tag">#멘토링 1회당 30분</div>
      </div>
      <div className="profile-field">
        <div className="profile-field-title">한줄 소개</div>
        <TextField content="한줄 소개 예시입니다 한줄 소개 예시입니다 한줄 소개 예시입니다 한줄 소개 예시입니다" />
      </div>
      <div className="profile-field">
        <div className="profile-field-title">이런 분들께 추천드려요</div>
        <TextField content="추천 대상 예시입니다 추천 대상 예시입니다 추천 대상 예시입니다 추천 대상 예시입니다 추천 대상 예시입니다 추천 대상 예시입니다" />
      </div>
    </MBestCaseContainer>
  );
}

export default MBestCaseContent;
