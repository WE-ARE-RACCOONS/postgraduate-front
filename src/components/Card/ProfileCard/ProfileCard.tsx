import { ProfileCardProps } from '@/types/card/profileCard';
import {
  ProfileCardContainer,
  ProfileCardInfo,
  ProfileCardInfoMid,
  ProfileCardInfoTop,
} from './ProfileCard.styled';
import RoundedImage from '@/components/Image/RoundedImage';
import user_icon from '../../../../public/user.png';
import AuthLabeledText from '@/components/Text/AuthLabeledText';
import { useEffect, useState } from 'react';

function ProfileCard(props: ProfileCardProps) {
  const koreanCharWidth = 1.2; // 한글 글자 너비로 가정
  const [overWidth, setOverWidth] = useState(false);

  useEffect(() => {
    const totalWidth =
      14 * koreanCharWidth * (props.major.length + props.postgradu.length + 3);
    if (totalWidth >= 208) setOverWidth(true);
  }, []);

  return (
    <ProfileCardContainer $overWidth={overWidth}>
      <div id="profile-img-wrapper">
        <RoundedImage
          imgSrc={props.profile.includes('http') ? props.profile : user_icon}
          altMsg="대학원 선배 프로필 이미지"
        />
      </div>
      <ProfileCardInfo $overWidth={overWidth}>
        <ProfileCardInfoTop>
          <AuthLabeledText
            str={props.nickname || '대학원 선배'}
            certification={props.certification}
          />
          <div id="profile-card-mentoring-time">
            <div id="mentoring-time-desc">멘토링 시간&nbsp;</div>
            <div id="mentoring-time-term">{props.term}분</div>
          </div>
        </ProfileCardInfoTop>
        <ProfileCardInfoMid>
          <div>
            {props.postgradu ? `${props.postgradu} 대학원` : '익명 대학원'}
            &nbsp;
          </div>
          <div>{props.major ? props.major : '익명 학과'}</div>
        </ProfileCardInfoMid>
        <div id="profile-card-professor">
          {props.professor ? `${props.professor} 교수님` : '익명 교수님'}
        </div>
      </ProfileCardInfo>
    </ProfileCardContainer>
  );
}

export default ProfileCard;
