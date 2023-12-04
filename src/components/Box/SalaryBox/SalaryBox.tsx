import { SalaryBoxProps } from "@/types/box/salaryBox";
import { SalaryBlock, SalaryBoxContainer, SalaryDesc, SalaryValue } from "./SalaryBox.styled";

function SalaryBox(props: SalaryBoxProps) {
  
  function addCommas(amount: number) {
    return amount.toLocaleString('ko-KR');
  }

  function formatDate(dateStr: string) {
    if(!dateStr) return '';
    
    const splitDate = dateStr.split('-');
    const month = parseInt(splitDate[1]);
    const date = splitDate[2];

    return `${month}월 ${date}일`;
  }

  return(
    <SalaryBoxContainer>
      <SalaryBlock>
        <SalaryDesc>정산 예정액</SalaryDesc>
        <SalaryValue>{addCommas(props.salaryAmount)}원</SalaryValue>
      </SalaryBlock>
      <SalaryBlock>
        <SalaryDesc>다음 정산 예정일</SalaryDesc>
        <SalaryValue>{formatDate(props.salaryDate)}</SalaryValue>
      </SalaryBlock>
    </SalaryBoxContainer>
  )
}

export default SalaryBox;