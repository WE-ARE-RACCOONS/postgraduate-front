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
import x_btn from '../../../../public/x_gray.png';
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
    <Image
      src={bank.imgSrc}
      alt={bank.name}
      width={22}
      height={22}
      style={{ marginRight: '0.4rem' }}
    />
    {bank.name}
  </BankColumn>
);

function BankForm({ clickHandler }: { clickHandler: () => void }) {
  const [bank, setBank] = useAtom(bankNameAtom);

  const handleClick = (selectedBank: string) => {
    setBank(selectedBank);
    clickHandler();
  };

  return (
    <BankContent>
      <div style={{ display: 'flex' }}>
        <h3>은행선택</h3>
        <Image
          src={x_btn}
          alt="x_btn"
          width={21}
          height={21}
          style={{ marginLeft: '70%' }}
        />
      </div>
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
