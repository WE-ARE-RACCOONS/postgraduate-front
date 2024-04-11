'use client';
import { useEffect } from 'react';
import Script from 'next/script';
import $ from 'jquery';
import { useRouter } from 'next/navigation';
import { ACTION } from 'next/dist/client/components/app-router-headers';
const PayplePayment = () => {
  const router = useRouter();
  const PAPLE_CLIENT_KEY = process.env.NEXT_PUBLIC_PAPLE_CLIENT_KEY;
  useEffect(() => {
    $(document).ready(() => {
      $('#requsetPayplePay').on('click', function (event) {
        let obj = new Object();
        obj.PCD_PAY_TYPE = 'card';
        obj.PCD_PAY_WORK = 'PAY';

        /* 02 : 앱카드 결제창 */
        obj.PCD_CARD_VER = '02';
        //유저 userId
        obj.PCD_PAYER_NO = '1234';
        // obj.PCD_PAYER_NAME = '홍길동';
        //내 번호 넣으면 알림톡 감
        obj.PCD_PAYER_HP = '01012345678';
        // obj.PCD_PAYER_EMAIL = 'dev@payple.kr';
        obj.PCD_PAY_GOODS = '멘토링 선배 닉네임';
        obj.PCD_PAY_TOTAL = '19900';
        obj.PCD_PAY_ISTAX = 'Y';
        obj.PCD_PAY_TAXTOTAL = '10';
        obj.clientKey = PAPLE_CLIENT_KEY;

        // 결제요청 함수 호출
        PaypleCpayAuthCheck(obj);
      });
    });
  }, []);
  return (
    <div>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></Script>
      <Script src="https://democpay.payple.kr/js/v1/payment.js"></Script>
      {/* Your button to trigger Payple payment */}
      <button id="requsetPayplePay">페이플 국내결제</button>
    </div>
  );
};

export default PayplePayment;
