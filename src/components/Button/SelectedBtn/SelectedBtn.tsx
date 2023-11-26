import { SelectedBtnProps } from "@/types/button/selectedBtn";
import { StyledSelectedBtn } from "./SelectedBtn.styled";

function SelectedBtn(props: SelectedBtnProps) {
  return(
    <StyledSelectedBtn>{props.btnText}</StyledSelectedBtn>
  )
}

export default SelectedBtn;