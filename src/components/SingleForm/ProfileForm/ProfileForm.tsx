import React, { forwardRef, useEffect, useState } from 'react';
import { ProfileFormProps } from '@/types/form/profileForm';
import {
  ProfileFormContainer,
  ProfileTitleContainer,
} from './ProfileForm.styled';
import SingleValidator from '@/components/Validator/SingleValidator';

const ProfileForm = forwardRef<HTMLTextAreaElement, ProfileFormProps>(
  (props, _ref) => {
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
      <ProfileFormContainer $flag={props.flag ?? false}>
        <ProfileTitleContainer>
          <div>{props.title}</div>
        </ProfileTitleContainer>
        {props.lineType === 'single' && (
          <div>
            <textarea
              id="single-profile-form"
              className={`profile-form-${props.formType}`}
              placeholder={props.placeholder}
              {...props?.register}
              onChange={(e) => {
                props.register?.onChange(e);
                handleChange(e);
              }}
            />
            <div id="char-count">
              <div>
                {charCount} / {props.maxLength || 0}
              </div>
              {props.errorMessage && (
                <SingleValidator msg={props.errorMessage} textColor="#FF5757" />
              )}
            </div>
          </div>
        )}
        {props.lineType === 'multi' && (
          <div>
            <textarea
              id="multi-profile-form"
              className={`profile-form-${props.formType}`}
              placeholder={props.placeholder}
              {...props?.register}
              onChange={(e) => {
                handleChange(e);
              }}
            ></textarea>

            <div id="char-count">
              <div>
                {charCount} / {props.maxLength || 0}
              </div>
              {props.errorMessage && (
                <SingleValidator msg={props.errorMessage} textColor="#FF5757" />
              )}
            </div>
          </div>
        )}
      </ProfileFormContainer>
    );
  },
);

export default ProfileForm;
