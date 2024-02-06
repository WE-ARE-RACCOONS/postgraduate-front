'use client';
import { useAtom } from 'jotai';
import { changeNickname, nickname, notDuplicate } from '@/stores/signup';
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
  const maxLength = 12;
  const [userNick, useUserNick] = useAtom(nickname);
  const [changeNick, setChangeNick] = useAtom(changeNickname);
  const [availability, useAvailability] = useAtom(notDuplicate);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (defaultValue === userNick) {
      console.log('sdkjfn');
      useAvailability(true);
      setFlag(false);
    }
  }, [userNick, defaultValue]);
  function checkNickname(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.currentTarget.value);
    e.currentTarget.value = filterInputText(e.currentTarget.value);
    e.currentTarget.value = checkLength(e.currentTarget.value);
    if (e.currentTarget.value === userNick) {
      //입력한것이 기존 닉네임과 같으면
      useAvailability(true);
      setFlag(false);
    } else {
      useAvailability(false);
      setChangeNick(e.currentTarget.value); //입력한거 저장 및 가용성 false
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

  //원래 닉네임과 바뀐닉네임이 다를때만 유효성 검사
  function checkDuplicate() {
    if (changeNick.length > 0 && changeNick !== userNick) {
      const params = { nickName: changeNick };
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/nickname`, { params })
        .then((res) => {
          if (res.data.data) {
            setFlag(true);
            useAvailability(true);
          } else {
            useAvailability(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  console.log(availability);
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
