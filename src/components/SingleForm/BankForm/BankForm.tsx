import React from 'react'
import Image from 'next/image'
import kbank from '../../../../public/Kbank.png'
import {BankContent,BankBox,
    BankRight,BankLeft,
    BankColumn} from './BankForm.styled'
import { BANK_NAME } from '@/constants/bank/bank'
function BankForm({ clickHandler }: { clickHandler: () => void }) {
  return (
    <BankContent>
      <h3>은행선택</h3>
      <BankBox>
        <BankLeft>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.k}
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.n}
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.s}
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.h}
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.sc}
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.g}
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.g}
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                {BANK_NAME.h}
            </BankColumn>
        </BankLeft>
        <BankRight>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                국민은행
            </BankColumn>
            <BankColumn>
                <Image
                src={kbank}
                alt='국민은행'
                width={22}
                height={22}
                />
                국민은행
            </BankColumn>
            
            </BankRight>
      </BankBox>
    </BankContent>
  )
}

export default BankForm
