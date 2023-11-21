'use client';
import styled from 'styled-components';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import React, { useState } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { nickname } from '@/stores/signup';
import { phoneNum } from '@/stores/signup';
import Photo from '@/components/Photo';

function page() {
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  const nickName = useAtomValue(nickname);
  const phoneNumber = useAtomValue(phoneNum);
  const selectpPhotoUrl = photoUrl ? URL.createObjectURL(photoUrl) : '';

  const handleClick = () => {
    if (photoUrl || nickname || phoneNum) {
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
      <Photo handler={setPhotoUrl} />
      {photoUrl && <SelectedImage src={selectpPhotoUrl} alt="Selected" />} 
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
