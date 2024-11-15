'use client';
import { useState, useEffect } from 'react';
import TypeBtn from '@/components/Button/TypeBtn';
import BackHeader from '@/components/Header/BackHeader';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
import junior from '../../../../public/junior.png';
import senior from '../../../../public/senior.png';

import { SIGNUP_COMMON } from '@/constants/signup/common';
import { JUNIOR_SELECT } from '@/constants/signup/junior';
import { SENIOR_SELECT } from '@/constants/signup/senior';
function SelectPage() {
  const router = useRouter();
  const currentPath = usePathname();
  const handleNextButtonClick = () => {
    router.push(currentPath + '/common-info');
  };
  return (
    <div>
      {/* <GoogleAnalytics /> */}
      <div style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)' }}>
        <BackHeader headerText="회원가입" kind="home" />
      </div>
      <div style={{ margin: '1.6rem 1rem' }}>
        <h3>{SIGNUP_COMMON.selectTitle}</h3>
        <SignUpFont>
          {SIGNUP_COMMON.selectDesc}
          <br />
          {SIGNUP_COMMON.convertDesc}
        </SignUpFont>
        <TypeBtnWrapper>
          <TypeBtn
            iconAlt="junior-icon"
            iconSrc={junior.src}
            iconText={JUNIOR_SELECT.iconText}
            typeDesc={JUNIOR_SELECT.typeDesc}
            typeDescColor={JUNIOR_SELECT.userType}
            typeDescS={`회원가입`}
            userType="junior"
          />
          <TypeBtn
            iconAlt="senior-icon"
            iconSrc={senior.src}
            iconText={SENIOR_SELECT.iconText}
            typeDesc={SENIOR_SELECT.typeDesc}
            typeDescColor={SENIOR_SELECT.userType}
            typeDescS={`회원가입`}
            userType="senior"
          />
        </TypeBtnWrapper>
      </div>
      <TypeBtnB onClick={handleNextButtonClick}>다음으로</TypeBtnB>
    </div>
  );
}

export default SelectPage;
const TypeBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  width: 20.75rem;
  height: 14rem;
`;
const SignUpFont = styled.div`
  margin-top: 0.5rem;
  color: #868e96;
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.03125rem;
`;
const TypeBtnB = styled.div`
  background: #2fc4b2;
  display: flex;
  width: inherit;
  margin: 1rem;
  margin-top: 40%;
  padding: 1rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.75rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
