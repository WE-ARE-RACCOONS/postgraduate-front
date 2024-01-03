'use client';
import CheckBox from '../checkbox/Checkbox';
import React, { useState, useEffect } from 'react';
import { TermsContainer, TermsShow, TermsBox,
  CheckBoxLayout
 } from './ServiceCondition.styled';
import { useAtom } from 'jotai';
import { essential } from '@/stores/condition';
import { allchecked } from '@/stores/condition';
import { option } from '@/stores/condition';

function ServiceCondition() {
  const [marketing, setMarketing] = useAtom(option);
  const [allAgreed, setAllAgreed] = useAtom(allchecked);
  const [service, setService] = useAtom(essential);

  const handleAllAgreedChange = () => {
    const newValue = !allAgreed;
    setAllAgreed(newValue);
    setService(newValue);
    setMarketing(newValue);
  };

  useEffect(() => {
    setAllAgreed(service && marketing);
    setService(service);
  }, [service, marketing]);

  return (
    <TermsBox>
      <CheckBoxLayout>
      <CheckBox checked={allAgreed} onChange={handleAllAgreedChange} />
      모든 이용약관에 동의합니다.
      </CheckBoxLayout>
      <TermsContainer>
        <CheckBox checked={service} onChange={setService} />
        (필수)이용약관과 개인정보 취급 방침에 동의
      </TermsContainer>
      <TermsContainer>
        <CheckBox checked={marketing} onChange={setMarketing} />
        (선택) 마케팅 개인정보 활용 동의
      </TermsContainer>
    </TermsBox>
  );
}
export default ServiceCondition;
