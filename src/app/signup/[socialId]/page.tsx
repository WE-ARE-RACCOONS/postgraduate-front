'use client';
import { useState, useEffect } from 'react';
import TypeBtn from '@/components/Button/TypeBtn';
import BackHeader from '@/components/Header/BackHeader';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
import junior from '../../../../public/junior.png'
import senior from '../../../../public/senior.png'
function SignUpPage() {
  const router = useRouter();
  const currentPath = usePathname();
  const handleNextButtonClick = () => {
    
      router.push(currentPath + '/common-info');
    
  };
  return (
    <div>
      <div style={{boxShadow:'0px 4px 8px 0px rgba(0, 0, 0, 0.10)'}}>
      <BackHeader headerText='회원가입'/>
      </div>
      <div style={{margin:'1.6rem 1rem'}}>
      <h3>회원 유형 선택</h3>
      <SignUpFont>
        가입하시려는 회원의 유형을 선택해주세요. <br />
        한쪽을 선택해도, 이후 마이페이지에서 전환 가능해요.
      </SignUpFont>
      <TypeBtnWrapper>
        <TypeBtn
        iconAlt='junior-icon'
          iconSrc={junior.src}
          iconText="후배 아이콘"
          typeDesc={`멘토링을 받는`}
          typeDescColor={`대학생 후배`}
          typeDescS={`회원가입`}
          userType="junior"
        />
        <TypeBtn
        iconAlt='senior-icon'
        iconSrc={senior.src}
          iconText="선배 아이콘"
          typeDesc={`멘토링을 받는`}
          typeDescColor={`대학원생 선배`}
          typeDescS={`회원가입`}
          userType="senior"
         
        />
      </TypeBtnWrapper>
      </div>
      <TypeBtnB
        onClick={handleNextButtonClick}
      >
        다음으로
      </TypeBtnB>
    </div>
  );
}

export default SignUpPage;
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
  color: #868E96;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 1.4rem */
letter-spacing: -0.03125rem;
`;
const TypeBtnB = styled.div`
background: #2FC4B2;
display: flex;
width: inherit;
margin: 1rem;
margin-top: 40%;
padding: 1rem 0rem;
justify-content: center;
align-items: center;
gap: 0.625rem;
border-radius: 0.75rem;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
