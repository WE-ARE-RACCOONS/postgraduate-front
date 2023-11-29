import { ProfileFormProps } from '@/types/form/profileForm';
import {
  ProfileFormContainer,
  ProfileTitleContainer,
} from './ProfileForm.styled';
import { useState } from 'react';

function ProfileForm(props: ProfileFormProps) {
  const [charCount, setCharCount] = useState(0);

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
          placeholder={props.placeholder}
          onChange={(e) => props.changeHandler(e.currentTarget.value)}
        />
      )}
      {props.lineType == 'multi' && (
        <textarea
          name="profile-form"
          id="multi-profile-form"
          placeholder={props.placeholder}
          onChange={(e) => handleChange(e)}
        ></textarea>
      )}
    </ProfileFormContainer>
  );
}

export default ProfileForm;
