'use client';
import useAuth from '@/hooks/useAuth';
import { changeNickname, phoneNum } from '@/stores/signup';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useSignUpUser } from '@/hooks/mutations/useSignupUser';
import { SignUpBtnContainer, SignUpBtnNonContainer } from './SignUpBtn.styled';
import { option } from '@/stores/condition';
import {
  desiredField,
  desiredFieldLen,
  desiredSchool,
  desiredSchoolLen,
} from '@/stores/matching';
import findExCode from '@/utils/findExCode';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';

function SignUpBtn() {
  const [socialId, setSocialId] = useState<number | null>(null);
  const nickName = useAtomValue(changeNickname);
  const phoneNumber = useAtomValue(phoneNum);
  const marketingReceive = useAtomValue(option);
  const major = useAtomValue(desiredSchool);
  const field = useAtomValue(desiredField);
  const schoolCharCount = useAtomValue(desiredSchoolLen);
  const fieldCharCount = useAtomValue(desiredFieldLen);
  const router = useRouter();
  const {
    setAccessToken,
    setRefreshToken,
    setUserType,
    getAccessToken,
    getUserType,
    removeTokens,
  } = useAuth();

  const { addToast } = useToast();
  const { mutate: signupUser } = useSignUpUser();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const socialId = window.localStorage.getItem('socialId');
      const socialIdNum = socialId ? parseInt(socialId) : null;
      setSocialId(socialIdNum);
    }
  }, []);

  const handleSignUp = () => {
    getAccessToken().then((accessTkn) => {
      // 선배 -> 후배 변경 회원
      if (accessTkn) {
        const userT = getUserType();
        if (userT === 'junior') {
          router.push('/');
          return;
        }

        if (userT === 'senior' && major && field) {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/change`,
              {
                major: major,
                field: field,
              },
              {
                headers: {
                  Authorization: `Bearer ${accessTkn}`,
                },
              },
            )
            .then((response) => {
              const res = response.data;

              if (findExCode(res.code)) {
                removeTokens();
                location.reload();
                return;
              }

              if (res.code === 'AU202') {
                setAccessToken({
                  token: res.data.accessToken,
                  expires: res.data.accessExpiration,
                });
                setRefreshToken({
                  token: res.data.refreshToken,
                  expires: res.data.refreshExpiration,
                });
                setUserType(res.data.role);

                router.push('/signup/done');
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
        return;
      }
    });

    if (socialId && nickName) {
      signupUser(
        {
          socialId,
          nickName,
          phoneNumber,
          marketingReceive,
        },
        {
          onError: () => {
            addToast({
              message: '회원가입을 할 수 없습니다. 잠시 후 다시 시도해주세요',
              status: 'error',
            });
          },
          onSuccess: (data) => {
            setAccessToken({
              token: data.accessToken,
              expires: data.accessExpiration,
            });
            setRefreshToken({
              token: data.refreshToken,
              expires: data.refreshExpiration,
            });
            setUserType(data.role);
            router.push('/signup/done');
          },
        },
      );
    }
  };

  return (
    <>
      {schoolCharCount && fieldCharCount ? (
        <SignUpBtnContainer onClick={handleSignUp}>
          가입완료 하기
        </SignUpBtnContainer>
      ) : (
        <SignUpBtnNonContainer onClick={handleSignUp}>
          가입완료 하기
        </SignUpBtnNonContainer>
      )}
    </>
  );
}

export default SignUpBtn;
