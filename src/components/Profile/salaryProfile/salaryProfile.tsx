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
      <SalaryImg
        src={data ? data.profile : '/user.png'}
        alt="Profile"
        height={76}
        width={76}
        style={{ borderRadius: '90%', marginTop: '0.2rem' ,border:'none'}}
      />
      <SalaryContent>
        <SalaryTitle>{data ? data.nickName : ''}&nbsp;후배와 맨토링</SalaryTitle>
        <SalaryDetail>
          <Sdate>
            진행일시&nbsp;<div id="date-msg">&nbsp;{data ? data.date : ''}</div>
          </Sdate>
          <Sdate>
            소요시간&nbsp;<div id="date-msg">&nbsp;{data ? data.term : ''}분</div>
          </Sdate>
          <Samount>
            정산금액&nbsp;
            <div id="salary-msg">&nbsp;{data ? data.salaryAmount : ''}원</div>
          </Samount>
        </SalaryDetail>
      </SalaryContent>
    </SalaryBox>
  );
}

export default SalaryProfile;
