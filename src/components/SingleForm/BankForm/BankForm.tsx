import React from 'react';
import Image from 'next/image';
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
import { BankColumnItemProps } from '@/types/bank/bank';
import { Bank } from '@/types/bank/bank';

const banks: Bank[] = [
  { name: BANK_NAME.k, imgSrc: '/Kbank.png' },
  { name: BANK_NAME.n, imgSrc: '/nh.png' },
  { name: BANK_NAME.ky, imgSrc: '/ky.png' },
  { name: BANK_NAME.sc, imgSrc: '/sc.png' },
  { name: BANK_NAME.t, imgSrc: '/toss.png' },
  { name: BANK_NAME.ki, imgSrc: '/ibk.png' },
  { name: BANK_NAME.si, imgSrc: '/si.png' },
  { name: BANK_NAME.u, imgSrc: '/u.png' },
  { name: BANK_NAME.ha, imgSrc: '/ha.png' },
  { name: BANK_NAME.ka, imgSrc: '/ka.png' },
];

const BankColumnItem: React.FC<BankColumnItemProps> = ({ bank, onClick }) => (
  <BankColumn onClick={onClick}>
    <Image src={bank.imgSrc} alt={bank.name} width={22} height={22} />
    {bank.name}
  </BankColumn>
);

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
          {banks.slice(0, 5).map((bank) => (
            <BankColumnItem
              key={bank.name}
              bank={bank}
              onClick={() => handleClick(bank.name)}
            />
          ))}
        </BankLeft>
        <BankRight>
          {banks.slice(5).map((bank) => (
            <BankColumnItem
              key={bank.name}
              bank={bank}
              onClick={() => handleClick(bank.name)}
            />
          ))}
        </BankRight>
      </BankBox>
    </BankContent>
  );
}

export default BankForm;
