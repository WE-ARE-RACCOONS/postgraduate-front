'use client';
import BackHeader from '@/components/Header/BackHeader';
import useFunnel from '@/hooks/useFunnel';
import { WishSeniorField } from './(components)/Field';
import { WishSeniorInfo } from './(components)/Info';
import styled from 'styled-components';
import { useState } from 'react';
import type { WishSeniorApplyRequest } from '@/api/senior/wishSeniorApply';

const applyWantedSeniorSteps = [
  'info',
  'field',
  'postgradu',
  'professor',
  'lab',
  'phoneNumber',
] as const;

export default function ApplyWantedSeniorPage() {
  const [WithSeniorFunnel, setStep, prevStep, _activeStep] = useFunnel(
    applyWantedSeniorSteps,
    {
      initialStep: 'info',
      stepChangeType: 'replace',
    } as const,
  );

  const [wishSenior, setWishSenior] = useState<WishSeniorApplyRequest>({
    field: '',
    postgradu: '',
    professor: '',
    lab: '',
    phoneNumber: '',
  });

  console.log(wishSenior);
  return (
    <main>
      <BackHeader headerText="" kind="modal" modalHandler={() => prevStep()} />
      <WithSeniorFunnel steps={applyWantedSeniorSteps} step="info">
        <WithSeniorFunnel.Step name="info">
          <WishSeniorInfo onClick={() => setStep('field')} />
        </WithSeniorFunnel.Step>
        <WithSeniorFunnel.Step name="field">
          <WishSeniorField
            onClick={(field) => {
              setWishSenior((prev) => ({
                ...prev,
                field,
              }));
              setStep('lab');
            }}
          />
        </WithSeniorFunnel.Step>
        <WithSeniorFunnel.Step name="lab">asd</WithSeniorFunnel.Step>
      </WithSeniorFunnel>
    </main>
  );
}

export const WishSeniorTitle = styled.h3`
  font-size: 17px;
  font-weight: 650;
  color: #000000;
`;

export const WishSeniorSubTitle = styled.h4`
  font-size: 14px;
  font-weight: 550;
  color: #6d747e;
`;
