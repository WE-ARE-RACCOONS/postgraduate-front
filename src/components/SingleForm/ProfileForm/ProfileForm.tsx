import { ProfileFormProps } from "@/types/form/profileForm";

function ProfileForm(props: ProfileFormProps) {
  return(
    <div>
      <div>
        <div>{props.title}</div>
        {props.lineType == 'multi' && (
          <div>0/{props.maxLength || 0}</div>
        )}
      </div>
      {props.lineType == 'single' && (
        <input type="text" placeholder={props.placeholder} />
      )}
      {props.lineType == 'multi' && (
        <textarea name="profile-form" id="profile-form" placeholder={props.placeholder}></textarea>
      )}
    </div>
  )
}

export default ProfileForm;