'use client';
import { useAtom } from 'jotai';
import {
  changeNickname,
  newNotDuplicate,
  nickname,
  notDuplicate,
  sameUserAtom,
} from '@/stores/signup';
import { useEffect, useState } from 'react';
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
  const maxLength = 6;
  const [userNick, setUserNick] = useAtom(nickname);
  const [changeNick, setChangeNick] = useAtom(changeNickname);
  const [availability, useAvailability] = useAtom(notDuplicate);
  const [newAvailability, useNewAvailability] = useAtom(newNotDuplicate);
  const [sameUser, setSameUser] = useAtom(sameUserAtom);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    //기존서버 닉네임과 사용자입력 닉네임이 같을때
    if (defaultValue && defaultValue === userNick) {
      useAvailability(false);
      setSameUser(true);
      setFlag(false);
    }
  }, [userNick, defaultValue]);

  function checkNickname(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = filterInputText(e.currentTarget.value);
    e.currentTarget.value = checkLength(e.currentTarget.value);
    if (defaultValue && e.currentTarget.value === defaultValue) {
      // 입력한 것이 기존 닉네임과 같으면
      useAvailability(true);
      useNewAvailability(false);
      setFlag(false);
    } else {
      // 입력한 거 저장 및 가용성 false
      //useNewAvailability 은 다르면 true
      useAvailability(false);
      useNewAvailability(true);
      setSameUser(false);
      setChangeNick(e.currentTarget.value);
    }
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

  // 원래 닉네임과 바뀐 닉네임이 다를때만 유효성 검사
  function checkDuplicate() {
    if (changeNick.length > 0 && changeNick !== defaultValue) {
      const params = { nickName: changeNick };
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/nickname`, { params })
        .then((res) => {
          if (res.data.data) {
            setFlag(true);
            useAvailability(true);
          } else {
            setFlag(true);
            useAvailability(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
            placeholder={'영어, 한글로 6글자까지 입력'}
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
