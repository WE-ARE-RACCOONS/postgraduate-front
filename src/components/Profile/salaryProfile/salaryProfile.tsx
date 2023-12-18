import { SalaryProps } from '@/types/profile/salary'
import React from 'react'
import {SalaryContent, SalaryBox, SalaryImg,SalaryTitle,SalaryDetail,Sdate,
    Samount, STerm} from './salaryProfile.styled'

function SalaryProfile({ data }: SalaryProps) {
  return (
  
      <SalaryBox>
        <SalaryImg>
            src={data ? data.profile : '/user.png'}
        </SalaryImg>
        <SalaryContent>
            <SalaryTitle>{data ? data.nickName : ''}후배와 맨토링</SalaryTitle>
            <SalaryDetail>
                <Sdate>진행일시: {data? data.date:''}</Sdate>
                <STerm>소요시간 : {data? data.term:''}</STerm>
                <Samount>정산금액 : {data? data.salaryAmount:''}</Samount>
            </SalaryDetail>
        </SalaryContent>
      </SalaryBox>
  
  )
}

export default SalaryProfile
