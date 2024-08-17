import React, { forwardRef, useEffect, useState } from 'react';
import { ProfileFormProps } from '@/types/form/profileForm';
import {
  ProfileFormContainer,
  ProfileTitleContainer,
} from './ProfileForm.styled';

const ProfileForm = forwardRef<HTMLTextAreaElement, ProfileFormProps>(
  (props, ref) => {
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
      if (props.loadStr) {
        const targetForm = document.querySelector(
          `.profile-form-${props.formType}`,
        ) as HTMLInputElement | HTMLTextAreaElement;
        if (targetForm) {
          targetForm.value = props.loadStr;
        }
        setCharCount(props.loadStr.length);
      }
    }, [props.loadStr]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (props.maxLength && e.currentTarget.value.length > props.maxLength) {
        e.currentTarget.value = e.currentTarget.value.slice(0, props.maxLength);
      }

      if (props.changeHandler) {
        props.changeHandler(e.currentTarget.value);
      }

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
        {props.lineType === 'single' && (
          <textarea
            id="single-profile-form"
            className={`profile-form-${props.formType}`}
            placeholder={props.placeholder}
            {...props?.register}
            onChange={handleChange}
          />
        )}
        {props.lineType === 'multi' && (
          <textarea
            id="multi-profile-form"
            className={`profile-form-${props.formType}`}
            placeholder={props.placeholder}
            {...props?.register}
            onChange={handleChange}
          ></textarea>
        )}
      </ProfileFormContainer>
    );
  },
);

export default ProfileForm;
