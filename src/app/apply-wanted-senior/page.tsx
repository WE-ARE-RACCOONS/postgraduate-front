'use client';

import BackHeader from '@/components/Header/BackHeader';
import useFunnel from '@/hooks/useFunnel';
import {
  WishSeniorInfo,
  WishSeniorField,
  WishSeniorLab,
  WishSeniorPhoneNum,
  WishSeniorPostGradu,
  WishSeniorProfessor,
  ApplyWantedSeniorSubmit,
} from './(components)/(steps)';
import { useWishSeniorApply } from '@/hooks/mutations/useWishSeniorApply';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import type { WishSeniorApplyRequest } from '@/api/senior/wishSeniorApply';
import RiseUpModal from '@/components/Modal/RiseUpModal';
import ProgressBar from '@/components/Bar/ProgressBar';

const applyWantedSeniorSteps = [
  'info',
  'field',
  'postgradu',
  'professor',
  'lab',
  'phoneNumber',
  'submit',
] as const;

export default function ApplyWantedSeniorPage() {
  const [WithSeniorFunnel, setStep, prevStep, _activeStep] = useFunnel(
    applyWantedSeniorSteps,
    {
      initialStep: 'info',
      stepChangeType: 'push',
    } as const,
  );

  const [wishSenior, setWishSenior] = useState<WishSeniorApplyRequest>({
    field: '',
    postgradu: '',
    professor: '',
    lab: '',
    phoneNumber: '',
  });

  const { mutate } = useWishSeniorApply();
  const router = useRouter();

  const openWithSeniorApplyAgreeModal = (phoneNumber: string) => {
    overlay.openAsync(({ unmount }) => {
      return (
        <RiseUpModal
          modalHandler={() => {}}
          onAgreeWith={(isAgree) => {
            if (isAgree) {
              mutate({ ...wishSenior, phoneNumber });
              setStep('submit');
              unmount();
            } else {
              unmount();
            }
          }}
          modalType="wish-senior-apply"
        />
      );
    });
  };

  return (
    <main>
      <BackHeader headerText="" kind="modal" modalHandler={() => prevStep()} />
      <ProgressBar
        activeNum={applyWantedSeniorSteps.findIndex((v) => v === _activeStep)}
        totalNum={applyWantedSeniorSteps.length}
      />
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
            onClick={(lab) => {
              setWishSenior((prev) => ({
                ...prev,
                lab,
              }));
              setStep('phoneNumber');
            }}
          />
        </WithSeniorFunnel.Step>

        <WithSeniorFunnel.Step name="phoneNumber">
          <WishSeniorPhoneNum
            onClick={(phone) => {
              openWithSeniorApplyAgreeModal(phone);
            }}
          />
        </WithSeniorFunnel.Step>

        <WithSeniorFunnel.Step name="submit">
          <ApplyWantedSeniorSubmit
            onClickSumitEnd={() => router.push('/')}
            onClickAnotherSubmit={() => setStep('field')}
          />
        </WithSeniorFunnel.Step>
      </WithSeniorFunnel>
    </main>
  );
}
