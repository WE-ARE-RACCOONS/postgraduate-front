'use client';
import InputForm from '@/components/SingleForm/InputForm/InputForm';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import SingleValidator from '@/components/Validator/SingleValidator';
function AccountPage() {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [data, setData] = useState('');
  const { getAccessToken } = useAuth();
  const validateInputs = () => {
    const isAccountNumberValid = /^[0-9]+$/.test(accountNumber);
    const isBankNameValid = /^[가-힣]+$/.test(bank);
    const isAccountHolderValid = /^[가-힣]+$/.test(accountHolder);

    const isValid =
      isAccountNumberValid && isBankNameValid && isAccountHolderValid;

    setFlag(!isValid);
    return isValid;
  };
  const accountHandler = () => {
    if (!flag) {
      const Token = getAccessToken();
      const headers = {
        Authorization: `Bearer ${Token}`,
      };
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/account`,
          {
            accountNumber: accountNumber,
            bank: bank,
            accountHolder: accountHolder,
          },
          {
            headers,
          },
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setFlag(true);
          console.error('Error fetching data:', error);
        });
    }
  };
  const handleComplete = () => {
    if (validateInputs()) {
      accountHandler();
      router.push('/senior/account/done');
    }
  };
  return (
    <div>
      <div>정산받을 계좌와</div>
      <div>주민번호를 입력해주세요</div>
      <div>입력한 정보는 멘토링 보수 정산과 세금신고에 사용됩니다</div>
      <div>멘토링 보수 정산</div>
      <AccontInput>
        <InputForm
          placeholder="계좌번호 입력(번호만 입력해주세요)"
          type="number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <InputForm
          placeholder="은행 명"
          type="text"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
        />
        <InputForm
          placeholder="예금주명 입력"
          type="text"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
        />
      </AccontInput>
      {flag && (
        <SingleValidator textColor="#FF3347" msg="잘못 입력된 내용이있어요" />
      )}
      <button onClick={handleComplete}>완료</button>
    </div>
  );
}
const AccontInput = styled.div`
  display: flex;
  flex-direction: column;
`;
export default AccountPage;
