'use client';
import useAuth from '@/hooks/useAuth';
import { nickname, phoneNum } from '@/stores/signup';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { useRouter, usePathname } from 'next/navigation';
import { SignUpBtnContainer } from './SignUpBtn.styled';
import { option } from '@/stores/condition';
import {
  desiredField,
  desiredSchool,
  matchingReceiveAtom,
} from '@/stores/matching';

function SignUpBtn() {
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const socialId = pathArr[2];
  const nickName = useAtomValue(nickname);
  const phoneNumber = useAtomValue(phoneNum);
  const marketingReceive = useAtomValue(option);
  const major = useAtomValue(desiredSchool);
  const field = useAtomValue(desiredField);
  const matchingReceive = useAtomValue(matchingReceiveAtom);
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useAuth();

  const handleSignUp = () => {
    if (socialId && nickName) {
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/signup`, {
          socialId,
          nickName,
          phoneNumber,
          marketingReceive,
          major,
          field,
          matchingReceive,
        })
        .then((res) => {
          const response = res.data;
          if (response.code == 'AU202') {
            setAccessToken({
              token: response.data.accessToken,
              expires: response.data.accessExpiration,
            });
            setRefreshToken({
              token: response.data.refreshToken,
              expires: response.data.refreshExpiration,
            });
            router.replace('/signup/done');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <SignUpBtnContainer onClick={handleSignUp}>가입하기</SignUpBtnContainer>
  );
}

export default SignUpBtn;
