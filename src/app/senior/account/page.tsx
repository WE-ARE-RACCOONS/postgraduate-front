'use client';
import InputForm from '@/components/SingleForm/InputForm/InputForm';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import SingleValidator from '@/components/Validator/SingleValidator';
import BackHeader from '@/components/Header/BackHeader';
import ModalBtn from '@/components/Button/ModalBtn';
import useModal from '@/hooks/useModal';
import { ModalType } from '@/types/modal/riseUp';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import { createPortal } from 'react-dom';
import { useAtomValue } from 'jotai';
import { bankNameAtom } from '@/stores/bankName';
function AccountPage() {
  const router = useRouter();
  const { modal, modalHandler, portalElement } = useModal('senior-info-portal');
  const [modalType, setModalType] = useState<ModalType>('bank');
  const [flag, setFlag] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const bank = useAtomValue(bankNameAtom);
  const [accountHolder, setAccountHolder] = useState('');
  const [data, setData] = useState('');
  const { getAccessToken, removeTokens } = useAuth();
  const isInputsFilled = accountNumber && bank && accountHolder;

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
      getAccessToken().then((Token) => {
        if (Token) {
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
              if(response.data.code == 'EX201') {
                removeTokens();
                router.replace('/');
                return;
              }
              setData(response.data);
            })
            .catch((error) => {
              setFlag(true);
              console.error('Error fetching data:', error);
            });
        }
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
    <SAContent>
      <BackHeader headerText="정산 정보 입력" />
      <div style={{ marginLeft: '1rem' }}>
        <h3 style={{ marginTop: '1.5rem' }}>정산받을 계좌와</h3>
        <h3 style={{ marginBottom: '0.5rem' }}>
          주은행, 예금주를 입력해주세요
        </h3>
        <div id="msg-top">입력한 정보는 멘토링 보수 정산에 사용됩니다.</div>
      </div>
      <AccontInput>
        <BtnBox>
          <MBtnFont>
            계좌번호&nbsp;<div id="font-color">*</div>
          </MBtnFont>

          <InputForm
            placeholder="xxxx-xxx-xxxxxx"
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </BtnBox>
        <BtnBox>
          <MBtnFont>
            입금은행&nbsp;<div id="font-color">*</div>
          </MBtnFont>
          <ModalBtn
            isGet={!bank}
            type="bankInfo"
            btnText={bank ? bank : '은행을 선택해주세요.'}
            modalHandler={modalHandler}
            onClick={() => {
              setModalType('bank');
            }}
          />
        </BtnBox>
        <BtnBox>
          <MBtnFont>
            예금주명&nbsp;<div id="font-color">*</div>
          </MBtnFont>
          <InputForm
            placeholder="예금주명 입력"
            type="text"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
          />
        </BtnBox>
        {flag && (
          <SingleValidator textColor="#FF3347" msg="잘못 입력된 내용이있어요" />
        )}
      </AccontInput>
      <div id="msg-bottom">
        정확한 정보를 입력했는지 다시 한 번 확인해주세요
      </div>
      {isInputsFilled ? (
        <SABtnT onClick={handleComplete}>완료</SABtnT>
      ) : (
        <SABtnF>완료</SABtnF>
      )}
      {modal && portalElement
        ? createPortal(
            <RiseUpModal modalHandler={modalHandler} modalType={modalType} />,
            portalElement,
          )
        : null}
    </SAContent>
  );
}
const AccontInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
  margin-left: 1rem;
  margin-bottom: 2.6rem;
`;
const SABtnT = styled.div`
  display: flex;
  width: 96%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background-color: #2fc4b2;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
const SABtnF = styled.div`
  display: flex;
  width: 96%;
  padding: 1rem 0rem;
  margin-left: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  background-color: #dee2e6;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const SAContent = styled.div`
  #msg-top {
    color: #868e96;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.4rem */
    letter-spacing: -0.03125rem;
  }
  #msg-bottom {
    color: #212529;
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 1.4rem */
    letter-spacing: -0.03125rem;
    margin-bottom: 0.75rem;
  }
`;
const BtnBox = styled.div`
  margin-top: 1rem;
`;
const MBtnFont = styled.div`
  display: flex;
  color: #212529;
  font-family: Noto Sans JP;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  #font-color {
    color: #00a0e1;
    font-family: Noto Sans JP;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
export default AccountPage;
