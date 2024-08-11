'use client';
import useFunnel from '@/hooks/useFunnel';
import {
  SIGNOUT_JUNIOR_SELECT,
  SIGNOUT_REASON_JUNIOR,
  SIGNOUT_REASON_SENIOR,
} from '@/app/signout/constant';

export default function SignOut() {
  const [SignoutFunnel, setSignoutStep] = useFunnel(
    ['signout_info', 'signout_type_select', 'signout_reason', 'signout_finish'],
    {
      initialStep: 'signout_info',
    } as const,
  );

  const handleSignOutTypeChange = (
    type: keyof typeof SIGNOUT_JUNIOR_SELECT,
  ) => {
    // 타입 변경 처리 로직 추가
  };

  return (
    <main>
      <h1>회원 탈퇴</h1>
      <SignoutFunnel
        step={'signout_info'}
        steps={[
          'signout_info',
          'signout_type_select',
          'signout_reason',
          'signout_finish',
        ]}
      >
        <SignoutFunnel.Step name={'signout_info'}>
          <div>탈퇴하기 정보</div>
          <button onClick={() => setSignoutStep('signout_type_select')}>
            다음
          </button>
        </SignoutFunnel.Step>
        <SignoutFunnel.Step name={'signout_type_select'}>
          <div>정보 선택</div>
          <button onClick={() => setSignoutStep('signout_reason')}>다음</button>
        </SignoutFunnel.Step>
        <SignoutFunnel.Step name={'signout_reason'}>
          <div>탈퇴 이유</div>
          <button onClick={() => setSignoutStep('signout_finish')}>다음</button>
        </SignoutFunnel.Step>
        <SignoutFunnel.Step name={'signout_finish'}>
          <div>탈퇴완료</div>
          <button onClick={() => setSignoutStep('signout_info')}>
            처음으로
          </button>
        </SignoutFunnel.Step>
      </SignoutFunnel>
    </main>
  );
}
