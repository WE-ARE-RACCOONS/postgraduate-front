'use client';
import { useAtom } from "jotai";
import { nickname } from '@/stores/nickname';
import { useEffect } from 'react';

function NicknameForm() {
  const [userNick, useUserNick] = useAtom(nickname);

  function checkNickname(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;
    e.currentTarget.value = filterInputText(inputValue);
    useUserNick(e.currentTarget.value);
  }

  useEffect(() => {
    console.log(userNick);
  }, [userNick]);

  function filterInputText(inputValue: string) {
    const regex = /^[a-zA-Z가-힣]*$/;
    if (!regex.test(inputValue)) {
      return inputValue.replace(/[^a-zA-Z가-힣]/g, '');
    }
    return inputValue;
  }

  return(
    <div>
      <input type="text" name="user-nickname" id="user-nickname" placeholder="닉네임을 입력해주세요." onChange={(e) => checkNickname(e)} />
      <button>중복확인</button>
    </div>
  )
}

export default NicknameForm;