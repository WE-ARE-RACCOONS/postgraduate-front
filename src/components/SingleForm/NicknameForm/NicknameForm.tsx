'use client';
import { useAtom } from "jotai";
import { nickname } from '@/stores/nickname';

function NicknameForm() {
  const [userNick, useUserNick] = useAtom(nickname);
  console.log('userNick is '+userNick);

  return(
    <div>
      <input type="text" name="user-nickname" id="user-nickname" placeholder="닉네임을 입력해주세요." />
      <button>중복확인</button>
    </div>
  )
}

export default NicknameForm;