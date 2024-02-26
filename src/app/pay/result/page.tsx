'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { orderIdAtom } from '@/stores/mentoring';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { successAtom } from '@/stores/condition';

const PayResultPage = () => {
  const [oderId, setOrderId] = useAtom(orderIdAtom);
  const router = useRouter();
  const[success , setSuccess] = useAtom(successAtom)
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
  const { getAccessToken } = useAuth();
  const payHandler = () => {
      const accessTkn = getAccessToken();
      if (
        accessTkn &&
        topic &&
        question &&
        firstTime &&
        secondTime &&
        thirdTime
      ) {
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
            console.log(res)
            if (res.code == 'MT202') {
              setSuccess(true);
              router.replace('/mentoring-apply/done');
            }
            else{
              setSuccess(false);
              router.replace('/mentoring-apply/done');
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
  useEffect(() => {
    const search = searchParams.get('orderId');
    if (search) {
      setOrderId(search);
      payHandler();
    }
  }, []);
  return <div>결제 결과 처리 중...</div>;
};

export default PayResultPage;
