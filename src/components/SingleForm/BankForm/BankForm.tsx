import React from 'react';
import Image from 'next/image';
import kbank from '../../../../public/Kbank.png';
import {
  BankContent,
  BankBox,
  BankRight,
  BankLeft,
  BankColumn,
} from './BankForm.styled';
import { BANK_NAME } from '@/constants/bank/bank';
import { useAtom } from 'jotai';
import { bankNameAtom } from '@/stores/bankName';
function BankForm({ clickHandler }: { clickHandler: () => void }) {
  const [bank, setBank] = useAtom(bankNameAtom);

  const handleClick = (selectedBank: string) => {
    setBank(selectedBank);
    console.log(selectedBank);
    clickHandler();
  };
  return (
    <BankContent>
      <h3>은행선택</h3>
      <BankBox>
        <BankLeft>
          <BankColumn onClick={() => handleClick(BANK_NAME.k)}>
            <Image src={kbank} alt="국민은행" width={22} height={22} />
            {BANK_NAME.k}
          </BankColumn>
          <BankColumn onClick={() => handleClick(BANK_NAME.n)}>
            <Image src={kbank} alt="농협은행" width={22} height={22} />
            {BANK_NAME.n}
          </BankColumn>
          <BankColumn>
            <Image src={kbank} alt="케이뱅크" width={22} height={22} />
            {BANK_NAME.ky}
          </BankColumn>
          <BankColumn>
            <Image src={kbank} alt="SC제일은행" width={22} height={22} />
            {BANK_NAME.sc}
          </BankColumn>
          <BankColumn>
            <Image src={kbank} alt="토스뱅크" width={22} height={22} />
            {BANK_NAME.t}
          </BankColumn>
        </BankLeft>
        <BankRight>
          <BankColumn>
            <Image src={kbank} alt="기업은행" width={22} height={22} />
            {BANK_NAME.ki}
          </BankColumn>
          <BankColumn>
            <Image src={kbank} alt="신한은행" width={22} height={22} />
            {BANK_NAME.si}
          </BankColumn>
          <BankColumn>
            <Image src={kbank} alt="우리은행" width={22} height={22} />
            {BANK_NAME.u}
          </BankColumn>
          <BankColumn>
            <Image src={kbank} alt="하나은행" width={22} height={22} />
            {BANK_NAME.ha}
          </BankColumn>
          <BankColumn>
            <Image src={kbank} alt="카카오뱅크" width={22} height={22} />
            {BANK_NAME.ka}
          </BankColumn>
        </BankRight>
      </BankBox>
    </BankContent>
  );
}

export default BankForm;
