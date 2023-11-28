import { ProfileFormProps } from "@/types/form/profileForm";
import { ProfileFormContainer, ProfileTitleContainer } from "./ProfileForm.styled";

function ProfileForm(props: ProfileFormProps) {
  return(
    <ProfileFormContainer>
      <ProfileTitleContainer>
        <div>{props.title}</div>
        {props.lineType == 'multi' && (
          <div>0/{props.maxLength || 0}</div>
        )}
      </ProfileTitleContainer>
      {props.lineType == 'single' && (
        <input type="text" id="single-profile-form" placeholder={props.placeholder} />
      )}
      {props.lineType == 'multi' && (
        <textarea name="profile-form" id="multi-profile-form" placeholder={props.placeholder}></textarea>
      )}
    </ProfileFormContainer>
  )
}

export default ProfileForm;