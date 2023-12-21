'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
import SingleValidator from '@/components/Validator/SingleValidator';
import {
  PROFILE_DIRECTION,
  PROFILE_PLACEHOLDER,
  PROFILE_SUB_DIRECTION,
} from '@/constants/form/cProfileForm';
import useAuth from '@/hooks/useAuth';
import {
  sAbleTime,
  sChatLink,
  sMultiIntroduce,
  sRecommendedFor,
  sSingleIntroduce,
} from '@/stores/senior';
import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function AddChatLinkPage() {
  const oneLiner = useAtomValue(sSingleIntroduce);
  const info = useAtomValue(sMultiIntroduce);
  const target = useAtomValue(sRecommendedFor);
  const times = useAtomValue(sAbleTime);
  const [chatLink, setChatLink] = useAtom(sChatLink);
  const [flag, setFlag] = useState(false);
  const router = useRouter();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    if (chatLink) {
      const targetForm = document.querySelector(
        '#add-chat-link-form',
      ) as HTMLInputElement;
      targetForm.value = chatLink;
      return;
    }
  }, []);

  const handleClick = () => {
    if (!chatLink) {
      setFlag(true);
      return;
    }

    if (chatLink && info && oneLiner && target && times.length >= 3) {
      const accessTkn = getAccessToken();

      if (accessTkn) {
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/profile`,
            {
              info: info,
              target: target,
              chatLink: chatLink,
              times: times,
              oneLiner: oneLiner,
            },
            {
              headers: {
                Authorization: `Bearer ${accessTkn}`,
              },
            },
          )
          .then((response) => {
            const res = response.data;
            if (res.code == 'SNR201') {
              router.push('/profile/done');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }

      return;
    }
  };

  return (
    <AddChatLinkContainer>
      <ProgressBar activeNum={2} />
      <h3 id="add-chat-link-direction">{PROFILE_DIRECTION.addChatLink}</h3>
      <div id="add-chat-link-sub-direction">
        {PROFILE_SUB_DIRECTION.addChatLink}
      </div>
      <div>
        <div id="add-chat-link-kakao">카카오톡 오픈채팅방 링크</div>
        <input
          type="text"
          id="add-chat-link-form"
          placeholder={PROFILE_PLACEHOLDER.addChatLink}
          onChange={(e) => {
            setChatLink(e.currentTarget.value);
          }}
        />
      </div>
      {flag && (
        <SingleValidator
          textColor="#FF0000"
          msg="오픈채팅방 링크를 입력해주세요"
        />
      )}
      <div id="add-chat-link-btn-container">
        <button
          onClick={() => {
            router.back();
          }}
        >
          이전
        </button>
        <button onClick={handleClick}>가입 완료하기</button>
      </div>
    </AddChatLinkContainer>
  );
}

export default AddChatLinkPage;

const AddChatLinkContainer = styled.div`
  width: inherit;
  height: 100%;
  white-space: pre-line;

  #add-chat-link-sub-direction {
    font-size: 15px;
    font-weight: 600;
  }

  #add-chat-link-kakao {
    width: 20.5rem;
    height: 1.375rem;
    font-size: 12px;
    font-weight: 700;
    border-radius: 5px;
    background-color: #d9d9d9;
    line-height: 1.375rem;
  }

  #add-chat-link-form {
    width: 20.5rem;
    height: 1.75rem;
  }
`;
