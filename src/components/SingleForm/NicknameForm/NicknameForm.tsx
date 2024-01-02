'use client';
import { useAtom } from 'jotai';
import { nickname, notDuplicate } from '@/stores/signup';
import { useState } from 'react';
import axios from 'axios';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  NicknameContainer,
  NicknameTotalContainer,
  NameFont,
  InputBox,
  InputBtn,
} from './NicknameForm.styled';

function NicknameForm({ defaultValue }: { defaultValue?: string }) {
  const maxLength = 12;
  const [userNick, useUserNick] = useAtom(nickname);
  const [availability, useAvailability] = useAtom(notDuplicate);
  const [flag, setFlag] = useState(false);

  function checkNickname(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = filterInputText(e.currentTarget.value);
    e.currentTarget.value = checkLength(e.currentTarget.value);
    useUserNick(e.currentTarget.value);
  }

  function filterInputText(inputValue: string) {
    const filteredValue = inputValue.replace(/[^a-zA-Zㄱ-힣]/g, '');

    return filteredValue;
  }

  function checkLength(inputValue: string) {
    if (inputValue.length > maxLength) {
      return inputValue.slice(0, maxLength);
    }
    return inputValue;
  }

  function checkDuplicate() {
    const params = { nickName: userNick };
    if (!flag) setFlag(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/nickname`, { params })
      .then((res) => {
        if (res.data.data) useAvailability(true);
        else useAvailability(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <NicknameTotalContainer>
      <NicknameContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <NameFont>닉네임</NameFont>
          {flag && (
            <SingleValidator
              textColor={availability ? '#00A0E1' : '#FF3347'}
              msg={
                availability
                  ? '사용 가능한 닉네임입니다.'
                  : '중복된 닉네임입니다.'
              }
            />
          )}
        </div>
        <InputBox>
          <input
            type="text"
            name="user-nickname"
            id="user-nickname"
            placeholder="영어, 한글로 6글자까지 입력"
            onChange={(e) => checkNickname(e)}
            defaultValue={defaultValue || ''}
          />
          <InputBtn
            onClick={() => {
              checkDuplicate();
            }}
          >
            중복확인
          </InputBtn>
        </InputBox>
      </NicknameContainer>
    </NicknameTotalContainer>
  );
}

export default NicknameForm;
