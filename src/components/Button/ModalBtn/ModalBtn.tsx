import { ModalBtnProps } from "@/types/button/modalBtn";
import { StyledModalBtn } from "./ModalBtn.styled";

function ModalBtn(props: ModalBtnProps) {
  return(
    <StyledModalBtn>{props.btnText}</StyledModalBtn>
  )
}

export default ModalBtn;