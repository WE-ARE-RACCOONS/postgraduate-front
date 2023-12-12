import React from 'react'
import { useRouter } from 'next/navigation'

function AccountShowBtn() {
    const router = useRouter();
    const showAccount = ()=> {
        router.push('/mypage/salary')
    }
  return (
    <div>
        <div>후배에게 리뷰작성을 요청하세요!</div>
        <div>멘토링 성사율이 올라가요!</div>
      <button onClick={showAccount}>정산 내역 보기</button>
    </div>
  )
}

export default AccountShowBtn;
