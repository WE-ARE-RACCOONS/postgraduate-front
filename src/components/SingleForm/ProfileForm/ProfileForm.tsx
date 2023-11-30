import { ProfileFormProps } from '@/types/form/profileForm';
import {
  ProfileFormContainer,
  ProfileTitleContainer,
} from './ProfileForm.styled';
import { useEffect, useState } from 'react';

function ProfileForm(props: ProfileFormProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if(props.loadStr) {
      const targetForm = document.querySelector(`.profile-form-${props.formType}`) as HTMLInputElement | HTMLTextAreaElement;
      targetForm.value = props.loadStr;
      return;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    props.changeHandler(e.currentTarget.value);
    if (props.lineType == 'multi') setCharCount(e.currentTarget.value.length);
  };

  return (
    <ProfileFormContainer>
      <ProfileTitleContainer>
        <div>{props.title}</div>
        {props.lineType == 'multi' && (
          <div>
            {charCount}/{props.maxLength || 0}
          </div>
        )}
      </ProfileTitleContainer>
      {props.lineType == 'single' && (
        <input
          type="text"
          id="single-profile-form"
          className={`profile-form-${props.formType}`}
          placeholder={props.placeholder}
          onChange={(e) => props.changeHandler(e.currentTarget.value)}
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
