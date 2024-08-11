'use client';
import useFunnel from '@/hooks/useFunnel';
import { SignOutInfoProvider } from '@/app/signout/signoutContext';

import { SignOutInfo } from '@/app/signout/(components)/signout-info';
import { SignOutTypeSelect } from '@/app/signout/(components)/signout-type-select';
import { SignOutHeader } from '@/app/signout/(components)/Header';

const signOutSteps = [
  'signout_info',
  'signout_type_select',
  'signout_reason',
  'signout_finish',
] as const;
export default function SignOut() {
  const [SignoutFunnel, setSignoutStep, prevStep] = useFunnel(signOutSteps, {
    initialStep: 'signout_info',
    stepChangeType: 'replace',
  } as const);

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
            <div>회원 탈퇴 이유</div>
            <button onClick={() => setSignoutStep('signout_finish')}>
              다음
            </button>
          </SignoutFunnel.Step>
          <SignoutFunnel.Step name={'signout_finish'}>
            <div>탈퇴완료</div>
            <button onClick={() => setSignoutStep('signout_info')}>
              처음으로
            </button>
          </SignoutFunnel.Step>
        </SignoutFunnel>
      </SignOutInfoProvider>
    </main>
  );
}
