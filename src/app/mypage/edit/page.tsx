'use client';
import styled from 'styled-components';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { nickname } from '@/stores/signup';
import { phoneNum } from '@/stores/signup';
import Photo from '@/components/Photo';
import useAuth from '@/hooks/useAuth';

function page() {
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  const nickName = useAtomValue(nickname);
  const phoneNumber = useAtomValue(phoneNum);
  const [profile, setprofile] = useState<string | null>(null);
  const selectpPhotoUrl = photoUrl ? URL.createObjectURL(photoUrl) : '';
  const { getAccessToken, getUserType } = useAuth();
  const Token = getAccessToken();
  useEffect(() => {
    if (Token) {
      const headers = {
        Authorization: `Bearer ${Token}`,
      };
      axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, { headers })
          .then((res) => {
            setprofile(res.data.data.profile);
          })
          .catch(function (error) {
            console.log(error);
          });
        }})

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
      {photoUrl ? (
        <>
        <div style={{ marginLeft: '8rem' }}>
            <Photo handler={setPhotoUrl} />
          </div>
        <SelectedImage src={selectpPhotoUrl} alt="Selected" />
        </>
      ) : (
        <>
          <div style={{ marginLeft: '8rem' }}>
            <Photo handler={setPhotoUrl} />
          </div>
          <PhotoBox src={profile ? profile : ''} />
        </>
      )}
      <NicknameForm />
      <PhoneNumForm />
      <ProfileSetBtn onClick={handleClick}>저장하기</ProfileSetBtn>
    </div>
  );
}
const SelectedImage = styled.img`
margin: 1.3rem 7.5rem;
 width: 7.5rem;
height: 7.5rem;
border: 1px solid rebeccapurple;
  border-radius: 90%;
`;
const PhotoBox = styled.img`
margin: 1.3rem 7.5rem;
  border: 1px solid red;
  width: 7.5rem;
height: 7.5rem;
flex-shrink: 0;
border-radius: 90%;
`;
const ProfileSetBtn = styled.button`
display: flex;
width: 21.4375rem;
padding: 1rem 0rem;
justify-content: center;
align-items: center;
gap: 0.625rem;
border-radius: 0.75rem;
background: #2FC4B2;
border: none;
margin-top: 58%;
margin-left: 0.5rem;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
export default page;
