'use client';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import ServiceCondition from '@/components/ServiceCondition';
import NextBtn from '@/components/Button/NextBtn';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import { useAtomValue } from 'jotai';
import { userTypeAtom } from '@/stores/signup';
import BackHeader from '@/components/Header/BackHeader';

function CommonInfoPage() {
  const userType = useAtomValue(userTypeAtom);

  return (
    <div>
      <div style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)' }}>
        <BackHeader headerText="회원가입" />
      </div>
      <h3 style={{ margin: '1.5rem 1rem' }}>회원 정보를 입력해 주세요.</h3>
      <NicknameForm />
      <PhoneNumForm />
      <ServiceCondition />
      <NextBtn
        kind="next"
        url={userType == 'junior' ? '/matching-info' : '/auth'}
        btnText="다음으로"
      />
    </div>
  );
}

export default CommonInfoPage;
