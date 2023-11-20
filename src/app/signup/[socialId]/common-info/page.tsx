'use client';
import NicknameForm from '@/components/SingleForm/NicknameForm';
import ServiceCondition from '@/components/ServiceCondition';
import NextBtn from '@/components/Button/NextBtn';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';
import { useAtomValue } from 'jotai';
import { userTypeAtom } from '@/stores/signup';

function CommonInfoPage() {
  const userType = useAtomValue(userTypeAtom);

  return (
    <div>
      <NicknameForm />
      <PhoneNumForm />
      <ServiceCondition />
      <NextBtn kind="next" url={userType == 'junior' ? "/matching-info" : "/auth"} />
    </div>
  );
}

export default CommonInfoPage;
