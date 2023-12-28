import { ProfileCardProps } from "@/types/card/profileCard";
import { ProfileCardContainer, ProfileCardInfo, ProfileCardInfoMid, ProfileCardInfoTop } from "./ProfileCard.styled";
import RoundedImage from "@/components/Image/RoundedImage";
import user_icon from '../../../../public/user.png';
import AuthLabeledText from "@/components/Text/AuthLabeledText";

function ProfileCard(props: ProfileCardProps) {
  return(
    <ProfileCardContainer>
      <div id="profile-img-wrapper">
        <RoundedImage imgSrc={props.profile ? props.profile : user_icon} altMsg="대학원 선배 프로필 이미지" />
      </div>
      <ProfileCardInfo>
        <ProfileCardInfoTop>
          <AuthLabeledText str={props.nickname || '대학원 선배'} />
          <div id="profile-card-mentoring-time">
            <div id="mentoring-time-desc">멘토링 시간&nbsp;</div>
            <div id="mentoring-time-term">{props.term}분</div>
          </div>
        </ProfileCardInfoTop>
        <ProfileCardInfoMid>
          <div>{props.postgradu ? `${props.postgradu} 대학원` : '익명 대학원'}&nbsp;</div>
          <div>{props.major ? props.major : '익명 학과'}</div>
        </ProfileCardInfoMid>
        <div id="profile-card-professor">{props.professor ? `${props.professor} 교수님` : '익명 교수님'}</div>
      </ProfileCardInfo>
    </ProfileCardContainer>
  )
}

export default ProfileCard;