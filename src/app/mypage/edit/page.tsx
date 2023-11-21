'use client';
import styled from 'styled-components';
import ProfileEdiitPhoto from '@/components/Photo'
import NicknameForm from '@/components/SingleForm/NicknameForm'
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm'
import React,{useState} from 'react'

function page() {
  const [photoUrl, setPhotoUrl] = useState('');

  return (
    <div>
    <ProfileEdiitPhoto handler={setPhotoUrl}/>
    {photoUrl && <SelectedImage src={photoUrl} alt="Selected" />}
    <NicknameForm />
    <PhoneNumForm />

    </div>
  )
}
const SelectedImage = styled.img`
  width: 12rem;
  height: 12rem;
  margin: 10px 0;
  border-radius: 5px;
`;

export default page

