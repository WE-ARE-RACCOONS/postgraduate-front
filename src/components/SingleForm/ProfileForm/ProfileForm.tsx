import { ProfileFormProps } from '@/types/form/profileForm';
import {
  ProfileFormContainer,
  ProfileTitleContainer,
} from './ProfileForm.styled';
import { useEffect, useState } from 'react';
function ProfileForm(props: ProfileFormProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (props.loadStr) {
      const targetForm = document.querySelector(
        `.profile-form-${props.formType}`,
      ) as HTMLInputElement | HTMLTextAreaElement;
      targetForm.value = props.loadStr;
      setCharCount(props.loadStr.length);
      return;
    }
  }, [props.loadStr]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (props.maxLength && e.currentTarget.value.length > props.maxLength) {
      e.currentTarget.value = e.currentTarget.value.slice(0, props.maxLength);
    }
    props.changeHandler(e.currentTarget.value);
    setCharCount(e.currentTarget.value.length);
  };

  return (
    <ProfileFormContainer $flag={props.flag}>
      <ProfileTitleContainer>
        <div>{props.title}</div>
        <div id="char-count">
          {charCount} / {props.maxLength || 0} 자
        </div>
      </ProfileTitleContainer>
      {props.lineType == 'single' && (
        <textarea
          id="single-profile-form"
          className={`profile-form-${props.formType}`}
          placeholder={props.placeholder}
          onChange={(e) => handleChange(e)}
        />
      )}
      {props.lineType == 'multi' && (
        <textarea
          name="profile-form"
          id="multi-profile-form"
          className={`profile-form-${props.formType}`}
          placeholder={props.placeholder}
          onChange={(e) => handleChange(e)}
        ></textarea>
      )}
    </ProfileFormContainer>
  );
}

export default ProfileForm;
