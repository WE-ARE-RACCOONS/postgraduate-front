'use client';
import Image from 'next/image';
import useFunnel from '@/hooks/useFunnel';
import { SignOutInfoProvider } from '@/app/signout/signoutContext';

import NextBtn from '@/components/Button/NextBtn';
import { SignOutReason } from '@/app/signout/(components)/signout-reason';
import { SignOutInfo } from '@/app/signout/(components)/signout-info';
import { SignOutTypeSelect } from '@/app/signout/(components)/signout-type-select';
import { SignOutHeader } from '@/app/signout/(components)/Header';
import Logo from '/public/logo.png';

const signOutSteps = [
  'signout_info',
  'signout_type_select',
  'signout_reason',
  'signout_finish',
] as const;
export default function SignOut() {
  const [SignoutFunnel, setSignoutStep, prevStep, _activeStep] = useFunnel(
    signOutSteps,
    {
      initialStep: 'signout_info',
      stepChangeType: 'replace',
    } as const,
  );

  return (
    <main>
      <SignOutInfoProvider>
        <SignOutHeader onClick={() => prevStep()} />

        <SignoutFunnel steps={signOutSteps} step="signout_info">
          <SignoutFunnel.Step name={'signout_info'}>
            <SignOutInfo
              onClick={() => setSignoutStep('signout_type_select')}
            />
          </SignoutFunnel.Step>
          <SignoutFunnel.Step name={'signout_type_select'}>
            <SignOutTypeSelect
              onClick={() => setSignoutStep('signout_reason')}
            />
          </SignoutFunnel.Step>
          <SignoutFunnel.Step name={'signout_reason'}>
            <SignOutReason onClick={() => setSignoutStep('signout_finish')} />
          </SignoutFunnel.Step>
          <SignoutFunnel.Step name={'signout_finish'}>
            <Image src={Logo} width={104} height={69} alt="logo" />
            <NextBtn kind={'route'} btnText="회원탈퇴완료" onClick={() => {}} />
          </SignoutFunnel.Step>
        </SignoutFunnel>
      </SignOutInfoProvider>
    </main>
  );
}
