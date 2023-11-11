'use client';
import CheckBox from '../CheckBox/CheckBox';
import React, { useState, useEffect } from 'react';
import { TermsContainer, TermsShow, TermsBox } from './ServiceCondition.styled';
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
      <CheckBox checked={allAgreed} onChange={handleAllAgreedChange} />
      전체동의
      <TermsContainer>
        <CheckBox checked={service} onChange={setService} />
        (필수)이용약관과 개인정보 취급 방침에 동의합니다.
        <TermsShow>보기</TermsShow>
      </TermsContainer>
      <TermsContainer>
        <CheckBox checked={marketing} onChange={setMarketing} />
        (선택)마케팅 동의.
        <TermsShow>보기</TermsShow>
      </TermsContainer>
    </TermsBox>
  );
}
export default ServiceCondition;
