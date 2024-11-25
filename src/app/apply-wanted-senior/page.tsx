'use client';
import BackHeader from '@/components/Header/BackHeader';
import useFunnel from '@/hooks/useFunnel';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { WISH_SENIOR_MENTOR_MSG } from './constant';
import { WishSeniorInfo } from './(components)/Info';
import styled from 'styled-components';

const applyWantedSeniorSteps = [
  'info',
  'field',
  'postgradu',
  'professor',
  'lab',
  'phoneNumber',
];

export default function ApplyWantedSeniorPage() {
  const [wishSeniorInfo, setWishSeniorInfo] = useQueryState(
    'wishSenior',
    parseAsStringEnum(applyWantedSeniorSteps),
  );

  const [WithSeniorFunnel, setStep, prevStep, _activeStep] = useFunnel(
    applyWantedSeniorSteps,
    {
      initialStep: 'info',
      stepChangeType: 'replace',
    } as const,
  );

  return (
    <main>
      <BackHeader headerText="" kind="modal" modalHandler={() => prevStep()} />
      <WithSeniorFunnel steps={applyWantedSeniorSteps} step="wish_mentor">
        <WithSeniorFunnel.Step name="info">
          <WishSeniorInfo onClick={() => setStep('field')} />
        </WithSeniorFunnel.Step>
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
