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
import { useRouter } from 'next/navigation';
import BackHeader from '@/components/Header/BackHeader';
function page() {
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  let editProfileUrl = '';
  const nickName = useAtomValue(nickname);
  const phoneNumber = useAtomValue(phoneNum);
  const [profile, setprofile] = useState<string | null>(null);
  const selectpPhotoUrl = photoUrl ? URL.createObjectURL(photoUrl) : '';
  const { getAccessToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`, { headers })
        .then((res) => {
          setprofile(res.data.data.profile);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  const handleClick = async () => {
    const token = getAccessToken();
    if (photoUrl) {
      const formData = new FormData();
      formData.append('profileFile', photoUrl);

      if (token) {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/image/upload/profile`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) => {
            const res = response.data;
            if (res.code == 'IMG202') {
              editProfileUrl = res.data.profileUrl;
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    if (editProfileUrl || nickName || phoneNumber) {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me/info`,
          {
            profile: editProfileUrl,
            nickName: nickName,
            phoneNumber: phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          const res = response.data;
          if (res.code == 'UR201') {
            router.push('/mypage');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      <BackHeader headerText='계정 설정'/>
      {photoUrl ? (
        <div style={{ display: 'flex' }}>
          <SelectedImage src={selectpPhotoUrl} alt="Selected" />
          <div style={{ marginTop: '7rem', overflow: 'visible' }}>
            <Photo handler={setPhotoUrl} />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <PhotoBox src={profile ? profile : ''} alt="userImage" />
          <div style={{ marginTop: '7rem', overflow: 'visible' }}>
            <Photo handler={setPhotoUrl} />
          </div>
        </div>
      )}
      <NicknameForm />
      <PhoneNumForm />
      <ProfileSetBtn onClick={handleClick}>저장하기</ProfileSetBtn>
    </div>
  );
}
const SelectedImage = styled.img`
  margin: 1.3rem 0;
  margin-left: 7.5rem;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 90%;
`;
const PhotoBox = styled.img`
  margin: 1.3rem 0;
  margin-left: 7.5rem;
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
  background: #2fc4b2;
  border: none;
  margin-top: 38%;
  margin-left: 0.5rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export default page;
