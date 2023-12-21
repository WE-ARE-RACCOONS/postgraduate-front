'use client';
import { useAtom } from 'jotai';
import { nickname, notDuplicate } from '@/stores/signup';
import { useState } from 'react';
import axios from 'axios';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  NicknameContainer,
  NicknameTotalContainer,
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
        <div>닉네임</div>
        <input
          type="text"
          name="user-nickname"
          id="user-nickname"
          placeholder="닉네임을 입력해주세요."
          onChange={(e) => checkNickname(e)}
          defaultValue={defaultValue || ''}
        />
        <button
          onClick={() => {
            checkDuplicate();
          }}
        >
          중복확인
        </button>
      </NicknameContainer>
      {flag && (
        <SingleValidator
          textColor={availability ? '#2dc95f' : '#FF3347'}
          msg={
            availability ? '사용 가능한 닉네임입니다.' : '중복된 닉네임입니다.'
          }
        />
      )}
    </NicknameTotalContainer>
  );
}

export default NicknameForm;
