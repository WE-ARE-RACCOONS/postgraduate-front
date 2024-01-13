import React from 'react';
import { useRouter } from 'next/navigation';
import {ASBtn} from './AccountShowBtn.styled'
function AccountShowBtn() {
  const router = useRouter();
  const showAccount = () => {
    router.push('/mypage/salary');
  };
  return (
    <div>
      <ASBtn onClick={showAccount}>정산 내역 보기</ASBtn>
    </div>
  );
}

export default AccountShowBtn;
