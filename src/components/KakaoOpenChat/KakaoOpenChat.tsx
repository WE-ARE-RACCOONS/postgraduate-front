import React, { useRef, useState } from 'react';
import {
  OpenChatBox,
  OpenChatComent,
  OpenChatBtn,
  OpenChatCopy,
} from './KakaoOpenChat.styled';
import { KakaoOpenChatProps } from '@/types/mentoring/mentoring';
function KakaoOpenChat({ url }: KakaoOpenChatProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <OpenChatBox>
        <OpenChatComent>대화방 선배가 카카오톡을 오픈 했어요 !</OpenChatComent>
        <OpenChatBtn onClick={handleCopyClick}>카카오톡 오픈링크</OpenChatBtn>
        {isCopied && <OpenChatCopy>복사되었습니다</OpenChatCopy>}
      </OpenChatBox>
    </div>
  );
}

export default KakaoOpenChat;
