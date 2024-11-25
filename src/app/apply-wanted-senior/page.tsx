'use client';

import BackHeader from '@/components/Header/BackHeader';
import useFunnel from '@/hooks/useFunnel';
import {
  WishSeniorInfo,
  WishSeniorField,
  WishSeniorLab,
  WishSeniorPostGradu,
  WishSeniorProfessor,
} from './(components)/(steps)';
import styled from 'styled-components';
import { overlay } from 'overlay-kit';
import { useAtomValue } from 'jotai';
import { phoneNum } from '@/stores/signup';
import { useEffect, useState } from 'react';
import type { WishSeniorApplyRequest } from '@/api/senior/wishSeniorApply';
import useDimmedModal from '@/hooks/useDimmedModal';
import RiseUpModal from '@/components/Modal/RiseUpModal';

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

  const defaultPhoneNum = useAtomValue(phoneNum);

  const [wishSenior, setWishSenior] = useState<WishSeniorApplyRequest>({
    field: '',
    postgradu: '',
    professor: '',
    lab: '',
    phoneNumber: defaultPhoneNum,
  });

  useEffect(() => {
    overlay.open(({ unmount }) => {
      return (
        <RiseUpModal modalType="wish-senior-apply" modalHandler={unmount} />
      );
    });
  }, []);
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
              setStep('postgradu');
            }}
          />
        </WithSeniorFunnel.Step>
        <WithSeniorFunnel.Step name="postgradu">
          <WishSeniorPostGradu
            onClick={(postgradu) => {
              setWishSenior((prev) => ({
                ...prev,
                postgradu,
              }));
              setStep('professor');
            }}
          />
        </WithSeniorFunnel.Step>

        <WithSeniorFunnel.Step name="professor">
          <WishSeniorProfessor
            onClick={(professor) => {
              setWishSenior((prev) => ({
                ...prev,
                professor,
              }));
              setStep('lab');
            }}
          />
        </WithSeniorFunnel.Step>

        <WithSeniorFunnel.Step name="lab">
          <WishSeniorLab
            onClick={(professor) => {
              setWishSenior((prev) => ({
                ...prev,
                professor,
              }));
              setStep('phoneNumber');
            }}
          />
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

export const NextBtnBox = styled.div`
  position: absolute;
  top: 35rem;
  width: 330px;
`;
