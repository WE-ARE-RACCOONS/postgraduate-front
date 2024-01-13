import React from 'react';
import Image from 'next/image';
import kbank from '../../../../public/Kbank.png';
import ubank from '../../../../public/u.png';
import sibank from '../../../../public/si.png';
import ibkbank from '../../../../public/ibk.png';
import scbank from '../../../../public/sc.png';
import nhbank from '../../../../public/nh.png';
import tossbank from '../../../../public/toss.png';
import kybank from '../../../../public/ky.png';
import kabank from '../../../../public/ka.png';
import habank from '../../../../public/ha.png';
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
            <Image src={nhbank} alt="농협은행" width={22} height={22}style={{marginRight:'0.38rem'}} />
            {BANK_NAME.n}
          </BankColumn>
          <BankColumn>
            <Image src={kybank} alt="케이뱅크" width={22} height={5} style={{marginRight:'0.38rem'}} />
            {BANK_NAME.ky}
          </BankColumn>
          <BankColumn>
            <Image src={scbank} alt="SC제일은행" width={22} height={22}style={{marginRight:'0.38rem'}} />
            {BANK_NAME.sc}
          </BankColumn>
          <BankColumn>
            <Image src={tossbank} alt="토스뱅크" width={22} height={22} style={{marginRight:'0.38rem'}}/>
            {BANK_NAME.t}
          </BankColumn>
        </BankLeft>
        <BankRight>
          <BankColumn>
            <Image src={ibkbank} alt="기업은행" width={22} height={22} style={{marginRight:'0.38rem'}}/>
            {BANK_NAME.ki}
          </BankColumn>
          <BankColumn>
            <Image src={sibank} alt="신한은행" width={22} height={22}style={{marginRight:'0.38rem'}} />
            {BANK_NAME.si}
          </BankColumn>
          <BankColumn>
            <Image src={ubank} alt="우리은행" width={22} height={22} style={{marginRight:'0.38rem'}}/>
            {BANK_NAME.u}
          </BankColumn>
          <BankColumn>
            <Image src={habank} alt="하나은행" width={22} height={22} style={{marginRight:'0.38rem'}}/>
            {BANK_NAME.ha}
          </BankColumn>
          <BankColumn>
            <Image src={kabank} alt="카카오뱅크" width={22} height={22} style={{marginRight:'0.38rem'}}/>
            {BANK_NAME.ka}
          </BankColumn>
        </BankRight>
      </BankBox>
    </BankContent>
  );
}

export default BankForm;
