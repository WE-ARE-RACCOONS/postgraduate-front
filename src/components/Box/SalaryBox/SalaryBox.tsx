import { SalaryBoxProps } from '@/types/box/salaryBox';
import {
  InfoMark,
  SalaryBlock,
  SalaryBoxContainer,
  SalaryDesc,
  SalaryValue,
} from './SalaryBox.styled';
import { Fragment } from 'react';

function SalaryBox(props: SalaryBoxProps) {
  function addCommas(amount: number) {
    if (amount === 0) {
      return '-';
    } else {
      return amount.toLocaleString('ko-KR') + '원';
    }
  }

  function formatDate(dateStr: string) {
    if (props.salaryAmount === 0) {
      return '-';
    } else {
      const splitDate = dateStr.split('-');
      const month = parseInt(splitDate[1]);
      const date = splitDate[2];
      return `${month}월 ${date}일`;
    }
  }

  return (
    <SalaryBoxContainer>
      <div id="left">
        <SalaryBlock>
          <SalaryDesc>정산 예정액</SalaryDesc>
          <SalaryValue>{addCommas(props.salaryAmount)}</SalaryValue>
        </SalaryBlock>
      </div>
      <div id="middle"></div>
      <div id="right">
        <SalaryBlock>
          <div style={{ width: '6.5rem', height: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SalaryDesc>다음 정산 예정일</SalaryDesc>
            <InfoMark>?</InfoMark>
          </div>
          <SalaryValue>{formatDate(props.salaryDate)}</SalaryValue>
        </SalaryBlock>
      </div>
    </SalaryBoxContainer>
  );
}

export default SalaryBox;
