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
import { option } from '@/stores/condition';
import { useJoinAsSenior } from '@/hooks/mutations/useJoinAsSenior';
import { useSeniorSignup } from '@/hooks/mutations/useSeniorSignup';
import {
  sChatLink,
  sFieldAtom,
  sKeywordAtom,
  sLabAtom,
  sMajorAtom,
  sPostGraduAtom,
  sProfessorAtom,
} from '@/stores/senior';
import { changeNickname, phoneNum } from '@/stores/signup';
import { detectReload, preventClose } from '@/utils/reloadFun';

import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SetTokenProps } from '@/types/user/user';

function AddChatLinkPage() {
  const [chatLink, setChatLink] = useAtom(sChatLink);
  const [flag, setFlag] = useState(false);
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();
  const [socialId, setSocialId] = useState<number | null>(null);
  const phoneNumber = useAtomValue(phoneNum);
  const nickName = useAtomValue(changeNickname);
  const marketingReceive = useAtomValue(option);
  const sPostGradu = useAtomValue(sPostGraduAtom);
  const sMajor = useAtomValue(sMajorAtom);
  const sLab = useAtomValue(sLabAtom);
  const sProfessor = useAtomValue(sProfessorAtom);
  const sField = useAtomValue(sFieldAtom);
  const sKeyword = useAtomValue(sKeywordAtom);

  const { mutate: joinAsSenior } = useJoinAsSenior();
  const { mutate: seniorSignup } = useSeniorSignup();

  useEffect(() => {
    if (chatLink) {
      const targetForm = document.querySelector(
        '#add-chat-link-form',
      ) as HTMLInputElement;
      targetForm.value = chatLink;
      return;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const socialId = window.localStorage.getItem('socialId');
      const socialIdNum = socialId ? parseInt(socialId) : null;
      setSocialId(socialIdNum);
    }
  }, []);

  useEffect(() => {
    detectReload();

    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  const setUserContext = (
    accToken: SetTokenProps,
    refreshToken: SetTokenProps,
    userType: string,
  ) => {
    setAccessToken({
      token: accToken.token,
      expires: accToken.expires,
    });
    setRefreshToken({
      token: refreshToken.token,
      expires: refreshToken.expires,
    });
    setUserType(userType);
  };

  const handleSubmit = () => {
    if (
      sMajor &&
      sPostGradu &&
      sProfessor &&
      sLab &&
      sKeyword &&
      sField &&
      chatLink
    ) {
      // 후배 -> 선배 변경
      joinAsSenior(
        {
          major: sMajor,
          postgradu: sPostGradu,
          professor: sProfessor,
          lab: sLab,
          field: sField,
          keyword: sKeyword,
          chatLink: chatLink,
        },
        {
          onSuccess: (data) => {
            setUserContext(
              {
                token: data.accessToken,
                expires: data.accessExpiration,
              },
              {
                token: data.refreshToken,
                expires: data.refreshExpiration,
              },
              data.role,
            );
          },
        },
      );
    }

    if (
      socialId &&
      phoneNumber &&
      nickName &&
      sMajor &&
      sPostGradu &&
      sProfessor &&
      sLab &&
      sKeyword &&
      sField &&
      chatLink
    ) {
      seniorSignup(
        {
          socialId: socialId,
          phoneNumber: phoneNumber,
          nickName: nickName,
          marketingReceive: marketingReceive,
          major: sMajor,
          postgradu: sPostGradu,
          professor: sProfessor,
          lab: sLab,
          field: sField,
          keyword: sKeyword,
          chatLink: chatLink,
        },
        {
          onSuccess: (data) => {
            setUserContext(
              {
                token: data.accessToken,
                expires: data.accessExpiration,
              },
              {
                token: data.refreshToken,
                expires: data.refreshExpiration,
              },
              data.role,
            );
          },
        },
      );
    }
  };

  return (
    <AddChatLinkContainer>
      <BackHeader headerText="링크 입력" />
      <ProgressBar totalNum={4} activeNum={3} />
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

      <SubmitBtn
        $ableSubmit={!!chatLink}
        onClick={!!chatLink ? handleSubmit : () => {}}
      >
        가입 완료
      </SubmitBtn>
    </AddChatLinkContainer>
  );
}

export default AddChatLinkPage;

const SubmitBtn = styled.div<{ $ableSubmit: boolean }>`
  width: 21.44rem;
  height: 3.375rem;
  padding: 1rem 0;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  background-color: ${(props) => (props.$ableSubmit ? '#2FC4B2' : '#dee2e6')};
  border: none;
  color: #fff;
  text-align: center;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: ${(props) => (props.$ableSubmit ? 'pointer' : 'default')};
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
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
  cursor: pointer;
`;

const AddChatLinkContainer = styled.div`
  width: inherit;
  height: 100vh;
  white-space: pre-line;
  position: relative;

  #add-chat-link-direction {
    margin-left: 1rem;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: #212529;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 1.75rem */
    letter-spacing: -0.03125rem;
  }

  #add-chat-link-sub-direction {
    margin-left: 1rem;
    color: #212529;
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
