import { SalaryProps } from '@/types/profile/salary';
import React from 'react';
import {
  SalaryContent,
  SalaryBox,
  SalaryImg,
  SalaryTitle,
  SalaryDetail,
  Sdate,
  Samount,
  STerm,
} from './salaryProfile.styled';

function SalaryProfile({ data }: SalaryProps) {
  return (
    <SalaryBox>
      <SalaryImg src={data ? data.profile : '/user.png'} alt="Profile" height={76} width={76} style={{borderRadius:'90%',marginTop:'0.2rem'}}/>
      <SalaryContent>
        <SalaryTitle>{data ? data.nickName : ''}후배와 맨토링</SalaryTitle>
        <SalaryDetail>
          <Sdate>진행일시: <div id='date-msg'>{data ? data.date : ''}</div></Sdate>
          <Sdate>소요시간: <div id='date-msg'>{data ? data.term : ''}분</div></Sdate>
          <Samount>정산금액 <div id='salary-msg'>{data ? data.salaryAmount : ''}원</div></Samount>
        </SalaryDetail>
      </SalaryContent>
    </SalaryBox>
  );
}

export default SalaryProfile;
