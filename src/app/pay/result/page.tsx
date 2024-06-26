'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { orderIdAtom } from '@/stores/mentoring';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { successAtom } from '@/stores/condition';
import findExCode from '@/utils/findExCode';

const PayResultPage = () => {
  const [oderId, setOrderId] = useAtom(orderIdAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic =
    typeof window !== 'undefined' ? window.localStorage.getItem('topic') : null;
  const question =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('question')
      : null;
  const firstTime =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('firstTime')
      : null;
  const secondTime =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('secondTime')
      : null;
  const thirdTime =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('thirdTime')
      : null;
  const { getAccessToken, removeTokens } = useAuth();
  const successLS = (successValue: boolean) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('success', successValue.toString());
    }
  };
  const payHandler = () => {
    getAccessToken().then((accessTkn) => {
      const oderId =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('orderId')
          : null;
      if (accessTkn) {
        const timeArr = [firstTime, secondTime, thirdTime];
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/mentoring/applying`,
            {
              orderId: oderId,
              topic: topic,
              question: question,
              date: timeArr.join(','),
            },
            {
              headers: {
                Authorization: `Bearer ${accessTkn}`,
              },
            },
          )
          .then((response) => {
            const res = response.data;
            if (findExCode(res.code)) {
              removeTokens();
              location.reload();
              return;
            }
            if (res.code == 'MT202') {
              successLS(true);
            } else {
              successLS(false);
            }
            router.push('/mentoring-apply/done');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };
  useEffect(() => {
    const search = searchParams.get('orderId');
    if (search) {
      setOrderId(search);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('orderId', search);
      }
      payHandler();
    }
  }, []);
  return <div>결제 결과 처리 중...</div>;
};

export default PayResultPage;
