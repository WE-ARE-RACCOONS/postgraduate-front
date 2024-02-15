'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom, useAtomValue } from 'jotai';
import { firAbleTimeAtom, orderIdAtom, questionAtom, secAbleTimeAtom, subjectAtom, thiAbleTimeAtom } from '@/stores/mentoring';

const PayResultPage = () => {
  const [oderId , setOrderId] = useAtom(orderIdAtom)
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const search = searchParams.get('orderId')
    if (search) {
      setOrderId(search);
      router.replace('/mentoring-apply/done')
    }
  }, []);
  return <div>결제 결과 처리 중...</div>;
};

export default PayResultPage;


