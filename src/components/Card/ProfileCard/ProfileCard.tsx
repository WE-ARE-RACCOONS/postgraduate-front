import { ProfileCardProps } from "@/types/card/profileCard";
import { ProfileCardContainer } from "./ProfileCard.styled";

function ProfileCard(props: ProfileCardProps) {
  return(
    <ProfileCardContainer>프로필 카드</ProfileCardContainer>
  )
}

export default ProfileCard;