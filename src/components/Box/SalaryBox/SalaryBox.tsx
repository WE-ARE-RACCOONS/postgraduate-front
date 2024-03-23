import { SalaryBoxProps } from '@/types/box/salaryBox';
import {
  SalaryBlock,
  SalaryBoxContainer,
  SalaryDesc,
  SalaryValue,
} from './SalaryBox.styled';

function SalaryBox(props: SalaryBoxProps) {
  function addCommas(amount: number) {
    if (amount === 0) {
      return '-';
    } else {
      return amount.toLocaleString('ko-KR') + '원';
    }
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return '';

    const splitDate = dateStr.split('-');
    const month = parseInt(splitDate[1]);
    const date = splitDate[2];

    return `${month}월 ${date}일`;
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
          <SalaryDesc>다음 정산 예정일</SalaryDesc>
          <SalaryValue>{formatDate(props.salaryDate)}</SalaryValue>
        </SalaryBlock>
      </div>
    </SalaryBoxContainer>
  );
}

export default SalaryBox;
