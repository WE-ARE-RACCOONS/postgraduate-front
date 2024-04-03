'use client';
import ProgressBar from '@/components/Bar/ProgressBar';
import BackHeader from '@/components/Header/BackHeader';
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
      getAccessToken().then((accessTkn) => {
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
      });
      return;
    }
  };

  return (
    <AddChatLinkContainer>
      <BackHeader headerText="링크 입력" />
      <ProgressBar totalNum={3} activeNum={2} />
      <h3 id="add-chat-link-direction">{PROFILE_DIRECTION.addChatLink}</h3>
      <div id="add-chat-link-sub-direction">
        {PROFILE_SUB_DIRECTION.addChatLink}
      </div>
      <div style={{ marginLeft: '1rem' }}>
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
        <PrevBtn
          onClick={() => {
            router.back();
          }}
        >
          이전
        </PrevBtn>
        {chatLink ? (
          <NextAddBtnSet onClick={handleClick}>다음</NextAddBtnSet>
        ) : (
          <NextAddBtn>가입 완료</NextAddBtn>
        )}
      </div>
    </AddChatLinkContainer>
  );
}

export default AddChatLinkPage;
const NextAddBtn = styled.button`
  display: flex;
  width: 55%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border-radius: 0.75rem;
  background: #dee2e6;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const NextAddBtnSet = styled.button`
  display: flex;
  width: 55%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-left: 0.4rem;
  border: none;
  background: #2fc4b2;
  border-radius: 0.75rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const PrevBtn = styled.button`
  display: flex;
  width: 35%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background: #adb5bd;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
  cursor: pointer;
`;

const AddChatLinkContainer = styled.div`
  width: inherit;
  height: 100%;
  white-space: pre-line;

  #add-chat-link-direction {
    margin-left: 1rem;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: #212529;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.75rem */
    letter-spacing: -0.03125rem;
  }
  #add-chat-link-sub-direction {
    margin-left: 1rem;
    color: #212529;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.225rem */
    letter-spacing: -0.03125rem;
  }

  #add-chat-link-kakao {
    margin-top: 2.5rem;
    color: #212529;
    font-family: 'Noto Sans JP';
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  #add-chat-link-form {
    width: 95%;
    height: 3.1875rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 1px solid #c2cede;
    background: #fff;
    margin-top: 0.5rem;
    padding: 0.87rem 1rem;

    &::placeholder {
      color: #adb5bd;
      font-family: 'Noto Sans JP';
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  #add-chat-link-btn-container {
    display: flex;
    position: absolute;
    width: inherit;
    bottom: 1rem;
  }
`;
