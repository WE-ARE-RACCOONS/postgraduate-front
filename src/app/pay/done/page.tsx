'use client';
import { firAbleTimeAtom, orderIdAtom, paySeniorIdAtom, questionAtom, secAbleTimeAtom, subjectAtom, thiAbleTimeAtom } from '@/stores/mentoring'
import axios from 'axios';
import { useAtomValue } from 'jotai'
import React, { useEffect } from 'react'
import useAuth from '@/hooks/useAuth';
function page() {
  const oderId = useAtomValue(orderIdAtom);
  const topic = useAtomValue(subjectAtom);
  const question = useAtomValue(questionAtom);
  const firstTime = useAtomValue(firAbleTimeAtom);
  const secondTime = useAtomValue(secAbleTimeAtom);
  const thirdTime = useAtomValue(thiAbleTimeAtom);
  const paySeniorId = useAtomValue(paySeniorIdAtom);
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
            seniorId: paySeniorId,
            orderId:oderId,
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
          if (res.code == 'MT202') {
            //  router.push('/mentoring-apply/done');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  useEffect(() => {
    payHandler(); // This will be called after the component mounts
  }, []);
  return (
    <div>
      결제를 성공했습니다.
    </div>
  )
}

export default page
