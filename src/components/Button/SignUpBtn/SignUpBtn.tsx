'use client';
import useAuth from '@/hooks/useAuth';
import { nickname, phoneNum, socialIdAtom } from '@/stores/signup';
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
  const socialId = useAtomValue(socialIdAtom);
  const nickName = useAtomValue(nickname);
  const phoneNumber = useAtomValue(phoneNum);
  const marketingReceive = useAtomValue(option);
  const major = useAtomValue(desiredSchool);
  const field = useAtomValue(desiredField);
  const matchingReceive = useAtomValue(matchingReceiveAtom);
  const router = useRouter();
  const { setAccessToken, setRefreshToken, setUserType, getAccessToken } =
    useAuth();

  const handleSignUp = () => {
    const accessTkn = getAccessToken();

    // 선배 -> 후배 변경 회원
    if (accessTkn) {
      if (major && field) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/change`,
            {
              major: major,
              field: field,
              matchingReceive: matchingReceive,
            },
            {
              headers: {
                Authorization: `Bearer ${accessTkn}`,
              },
            },
          )
          .then((response) => {
            const res = response.data;

            if (res.code == 'AU202') {
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
            setUserType(response.data.role);

            router.push('/signup/done');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <SignUpBtnContainer onClick={handleSignUp}>
      가입완료 하기
    </SignUpBtnContainer>
  );
}

export default SignUpBtn;
