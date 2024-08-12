'use client';
import useFunnel from '@/hooks/useFunnel';
import { SignOutInfoProvider } from '@/app/signout/signoutContext';

import { SignOutFinish } from '@/app/signout/(components)/signout-finish';
import { SignOutReason } from '@/app/signout/(components)/signout-reason';
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
  const [SignoutFunnel, setSignoutStep, prevStep, _activeStep] = useFunnel(
    signOutSteps,
    {
      initialStep: 'signout_info',
      stepChangeType: 'replace',
    } as const,
  );
  const _handleSignOutFinish = () => {
    //회원탈퇴 FLow
    //회원탈퇴 API -> 토큰 제거 -> 버튼에 GA이벤트..?
  };

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
            <SignOutFinish onClick={_handleSignOutFinish} />
          </SignoutFunnel.Step>
        </SignoutFunnel>
      </SignOutInfoProvider>
    </main>
  );
}
