import { ProfileCardProps } from '@/types/card/profileCard';
import {
  ProfileCardContainer,
  ProfileCardInfo,
  ProfileCardInfoMid,
  ProfileCardInfoTop,
} from './ProfileCard.styled';
import RoundedImage from '@/components/common/RoundedImage';
import user_icon from '../../../../../../public/user.png';
import AuthLabeledText from '@/components/common/Text/AuthLabeledText';
import { useEffect, useState } from 'react';

function ProfileCard(props: ProfileCardProps) {
  const koreanCharWidth = 1.2; // 한글 글자 너비로 가정
  const [overWidth, setOverWidth] = useState(false);

  useEffect(() => {
    const totalWidth =
      14 * koreanCharWidth * (props.lab.length + props.postgradu.length + 3);
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
            str={`${props.nickname} 선배님` || '대학원 선배'}
            certification={props.certification}
          />
          <div id="profile-card-mentoring-time">
            <div id="mentoring-time-desc">멘토링 시간&nbsp;</div>
            <div id="mentoring-time-term">{props.term}분</div>
          </div>
        </ProfileCardInfoTop>
        <ProfileCardInfoMid>
          <div>{`[${props.postgradu.replaceAll('학교', '')}]`}</div>

          <div>{props.lab}</div>
        </ProfileCardInfoMid>
        <div id="profile-card-professor">
          <span id="professor-name">
            {props.professor ? `${props.professor} ` : '익명 '}
          </span>
          <span>교수님</span>
        </div>
      </ProfileCardInfo>
      <div id="profile-card-one-linear">"{props.oneLinear ?? ''}"</div>
    </ProfileCardContainer>
  );
}

export default ProfileCard;
