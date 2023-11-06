'use client';
import { useAtom } from 'jotai';
import { nickname } from '@/stores/nickname';
import { useEffect } from 'react';
import axios from 'axios';

function NicknameForm() {
  const maxLength = 12;
  const regex = /^[a-zA-Z가-힣]*$/;
  const [userNick, useUserNick] = useAtom(nickname);

  function checkNickname(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = filterInputText(e.currentTarget.value);
    e.currentTarget.value = checkLength(e.currentTarget.value);
    useUserNick(e.currentTarget.value);
  }

  useEffect(() => {
    console.log(userNick);
  }, [userNick]);

  function filterInputText(inputValue: string) {
    if (!regex.test(inputValue)) {
      return inputValue.replace(/[^a-zA-Z가-힣]/g, '');
    }
    return inputValue;
  }

  function checkLength(inputValue: string) {
    if (inputValue.length > maxLength) {
      return inputValue.slice(0, maxLength);
    }
    return inputValue;
  }

  function checkDuplicate() {
    const params = { nickName: userNick };
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/nickname`, { params })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <input
        type="text"
        name="user-nickname"
        id="user-nickname"
        placeholder="닉네임을 입력해주세요."
        onChange={(e) => checkNickname(e)}
      />
      <button
        onClick={() => {
          checkDuplicate();
        }}
      >
        중복확인
      </button>
    </div>
  );
}

export default NicknameForm;
