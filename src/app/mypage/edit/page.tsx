'use client';
import styled from 'styled-components';
import ProfileEditPhoto from '@/components/Photo';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import React, { useState } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { nickname } from '@/stores/signup';
import { phoneNum } from '@/stores/signup';

function page() {
  const [photoUrl, setPhotoUrl] = useState('');
  const nickName = useAtomValue(nickname);
  const phoneNumber = useAtomValue(phoneNum);
  const handleClick = () => {
    if (photoUrl || nickname || phoneNum) {
      // Perform axios post
      // Example: You need to replace the URL and data with your actual endpoint and payload
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/junior/me/profile`, {
          photoUrl,
          nickName,
          phoneNumber,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <ProfileEditPhoto handler={setPhotoUrl} />
      {photoUrl && <SelectedImage src={photoUrl} alt="Selected" />}
      <NicknameForm />
      <PhoneNumForm />
      <button onClick={handleClick}>수정하기</button>
    </div>
  );
}
const SelectedImage = styled.img`
  width: 12rem;
  height: 12rem;
  margin: 10px 0;
  border-radius: 5px;
`;

export default page;
