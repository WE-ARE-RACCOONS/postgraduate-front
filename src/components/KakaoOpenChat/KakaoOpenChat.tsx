import React, { useRef, useState } from 'react';
import {
  OpenChatBox,
  OpenChatComent,
  OpenChatBtn,
  OpenChatCopy,
} from './KakaoOpenChat.styled';
import Image from 'next/image';
import copy from '@/../../public/copy.png';
import { KakaoOpenChatProps } from '@/types/mentoring/mentoring';
function KakaoOpenChat({ url }: KakaoOpenChatProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => {
        // window.alert('클립보드에 링크가 복사되었습니다.');
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <OpenChatBox>
        <OpenChatComent>대학원 선배가 카카오톡을 오픈 했어요 !</OpenChatComent>
        <OpenChatBtn onClick={handleCopyClick}>
          {url}
          <Image
            id="copy"
            src={copy}
            alt="복사"
            width={20}
            height={20}
            priority
            onClick={handleCopyClick}
            style={{ marginLeft: '11.3rem' }}
          />
        </OpenChatBtn>
        {isCopied && <OpenChatCopy>복사되었습니다</OpenChatCopy>}
      </OpenChatBox>
    </div>
  );
}

export default KakaoOpenChat;
