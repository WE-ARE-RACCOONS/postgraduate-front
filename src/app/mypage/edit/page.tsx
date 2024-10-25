'use client';
import styled from 'styled-components';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import React, { useState, useEffect } from 'react';
import { postUserProfileImage } from '@/api/user/_images/postUserProfileImage';
import { changeUserInfo } from '@/api/user/info/changeUserInfoFetch';
import { useAtom, useAtomValue } from 'jotai';
import {
  changeNickname,
  newNotDuplicate,
  nickname,
  notDuplicate,
  phoneNumValidation,
  remainPhoneNum,
  sameUserAtom,
} from '@/stores/signup';
import { phoneNum } from '@/stores/signup';
import Photo from '@/components/Photo';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import BackHeader from '@/components/Header/BackHeader';
import { userInfoFetch } from '@/api/user/info/useInfoFetch';
import findExCode from '@/utils/findExCode';
function page() {
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  let editProfileUrl = '';
  const [myNickName, setNickName] = useAtom(nickname);
  const changeNick = useAtomValue(changeNickname);
  const [phoneNumber, setPhoneNumber] = useAtom(remainPhoneNum);
  const [profile, setprofile] = useState<string>('');
  const selectpPhotoUrl = photoUrl ? URL.createObjectURL(photoUrl) : '';
  const { removeTokens } = useAuth();
  const router = useRouter();

  const availability = useAtomValue(notDuplicate);
  const [availablePhone, setAvailablePhone] = useAtom(phoneNumValidation);
  const newAvailability = useAtomValue(newNotDuplicate);
  const sameUser = useAtomValue(sameUserAtom);
  const fullNum = useAtomValue(phoneNum);
  useEffect(() => {
    userInfoFetch().then((res) => {
      if (findExCode(res.data.code)) {
        removeTokens();
        location.reload();
      }
      const { nickName, profile, phoneNumber } = res.data.data;
      setNickName(nickName);
      setprofile(profile);
      setPhoneNumber(phoneNumber);
      setAvailablePhone(false);
    });
  }, []);

  const handleClick = async () => {
    if (photoUrl) {
      const { data } = await postUserProfileImage({
        profileFile: photoUrl,
      });
      if (data.code === 'IMG202') {
        editProfileUrl = data.data.profileUrl;
      }
    }

    if (editProfileUrl || changeNick || fullNum) {
      const { data } = await changeUserInfo({
        profile: editProfileUrl ? editProfileUrl : profile,
        nickName: changeNick ? changeNick : myNickName,
        phoneNumber: fullNum ? fullNum : phoneNumber,
      });

      if (data.code === 'UR201') {
        router.push('/mypage');
      }
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      <BackHeader headerText="계정 설정" />
      {photoUrl ? (
        <div style={{ display: 'flex' }}>
          <SelectedImage src={selectpPhotoUrl} alt="Selected" />
          <div style={{ marginTop: '7rem', overflow: 'visible' }}>
            <Photo type="camera" handler={setPhotoUrl} />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <PhotoBox src={profile ? profile : ''} alt="userImage" />
          <div style={{ marginTop: '7rem', overflow: 'visible' }}>
            <Photo type="camera" handler={setPhotoUrl} />
          </div>
        </div>
      )}
      <NicknameForm defaultValue={myNickName} />
      <PhoneNumForm defaultValue={phoneNumber} />
      {(newAvailability && availability) ||
      (sameUser && availablePhone) ||
      selectpPhotoUrl ? (
        <ProfileSetBtn onClick={handleClick}>저장하기</ProfileSetBtn>
      ) : (
        <ProfileSetBtnNon>저장하기</ProfileSetBtnNon>
      )}
    </div>
  );
}
const SelectedImage = styled.img`
  position: absolute;
  margin: 1.3rem 0;
  margin-left: 7.5rem;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 90%;
`;
const PhotoBox = styled.img`
  position: absolute;
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
const ProfileSetBtnNon = styled.button`
  display: flex;
  width: 21.4375rem;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #dee2e6;
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
