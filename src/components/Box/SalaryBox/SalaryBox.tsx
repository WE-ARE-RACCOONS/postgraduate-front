import { SalaryBoxProps } from "@/types/box/salaryBox";
import { SalaryBlock, SalaryBoxContainer } from "./SalaryBox.styled";

function SalaryBox(props: SalaryBoxProps) {
  return(
    <SalaryBoxContainer>
      <SalaryBlock>{props.salaryAmount}</SalaryBlock>
      <SalaryBlock>{props.salaryDate}</SalaryBlock>
    </SalaryBoxContainer>
  )
}

export default SalaryBox;