'use client';
import CheckBox from '../Checkbox/Checkbox';
import React, { useState, useEffect } from 'react';
import {
  TermsContainer,
  TermsBox,
  CheckBoxLayout,
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
        <CheckBox
          type="accept"
          checked={allAgreed}
          onChange={handleAllAgreedChange}
        />
        모든 이용약관에 동의합니다.
      </CheckBoxLayout>
      <TermsContainer>
        <CheckBox type="accept" checked={service} onChange={setService} />
        <div id="container-color">(필수)&nbsp;</div>
        <div id="container-line">이용약관</div>과&nbsp;
        <div id="container-line">개인정보 취급 방침</div>&nbsp;동의
      </TermsContainer>
      <TermsContainer>
        <CheckBox type="accept" checked={marketing} onChange={setMarketing} />
        (선택)&nbsp;<div id="container-line">마케팅 개인정보</div>&nbsp;활용
        동의
      </TermsContainer>
    </TermsBox>
  );
}
export default ServiceCondition;
