'use client';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import ServiceCondition from '@/components/ServiceCondition';
import NextBtn from '@/components/Button/NextBtn';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import { useAtomValue } from 'jotai';
import {
  changeNickname,
  notDuplicate,
  phoneNum,
  phoneNumValidation,
} from '@/stores/signup';
import BackHeader from '@/components/Header/BackHeader';
import { essential } from '@/stores/condition';
import { useEffect, useState } from 'react';
import { detectReload, preventClose } from '@/utils/reloadFun';
import { useSignUpUser } from '@/hooks/mutations/useSignupUser';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { SignUpBtnContainer } from '@/components/Button/SignUpBtn/SignUpBtn.styled';

function CommonInfoPage() {
  const [socialId, setSocialId] = useState<number | null>(null);

  const router = useRouter();
  const { addToast } = useToast();
  const { setAccessToken, setRefreshToken, setUserType } = useAuth();

  const userNick = useAtomValue(changeNickname);
  const fullNum = useAtomValue(phoneNum);
  const service = useAtomValue(essential);
  const nickAvailable = useAtomValue(notDuplicate);
  const phoneAvailable = useAtomValue(phoneNumValidation);

  const { mutate: signupUser } = useSignUpUser();

  useEffect(() => {
    detectReload();

    window.addEventListener('beforeunload', preventClose);

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const socialId = window.localStorage.getItem('socialId');
      const socialIdNum = socialId ? parseInt(socialId) : null;
      setSocialId(socialIdNum);
    }
  }, []);

  const handleSignup = () => {
    if (socialId) {
      signupUser(
        {
          socialId,
          nickName: userNick,
          phoneNumber: fullNum,
          marketingReceive: service,
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
    <div>
      <div style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)' }}>
        <BackHeader headerText="회원가입" />
      </div>
      <h3 style={{ margin: '1.5rem 1rem' }}>회원 정보를 입력해 주세요.</h3>
      <NicknameForm />
      <PhoneNumForm />
      <ServiceCondition />
      {userNick && fullNum && service && nickAvailable && phoneAvailable ? (
        <SignUpBtnContainer onClick={handleSignup}>
          가입완료 하기
        </SignUpBtnContainer>
      ) : (
        <NextBtn kind="route-non" btnText="다음으로" />
      )}
    </div>
  );
}

export default CommonInfoPage;
