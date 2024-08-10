import { useFunnel } from '@toss/use-funnel';
import {
  SIGNOUT_JUNIOR_SELECT,
  SIGNOUT_REASON_JUNIOR,
  SIGNOUT_REASON_SENIOR,
} from '@/app/signout/constant';

export default function SignOut() {
  const [SignoutFunnel, setSignoutStep] = useFunnel([
    'signout_info',
    'signout_type_select',
    'signout_reason',
    'signout_finish',
  ] as const).withState<{
    signOutType: keyof typeof SIGNOUT_JUNIOR_SELECT;
    signoutReason:
      | keyof typeof SIGNOUT_REASON_JUNIOR
      | keyof typeof SIGNOUT_REASON_SENIOR;
    etc?: string;
  }>({
    signOutType: 'JUNIOR',
    signoutReason: 'ETC',
    etc: '',
  });

  const handleSignOutTypeChange = (
    type: keyof typeof SIGNOUT_JUNIOR_SELECT,
  ) => {};

  return (
    <main>
      <SignoutFunnel>
        <SignoutFunnel.Step name={'signout_info'}>
          <div>탈퇴하기 정보 </div>
        </SignoutFunnel.Step>
        <SignoutFunnel.Step name={'signout_type_select'}>
          <div>정보 선택</div>
        </SignoutFunnel.Step>
        <SignoutFunnel.Step name={'signout_reason'}>
          <div>탈퇴 이유</div>
        </SignoutFunnel.Step>
        <SignoutFunnel.Step name={'signout_finish'}>
          <div>탈퇴완료</div>
        </SignoutFunnel.Step>
      </SignoutFunnel>
    </main>
  );
}
