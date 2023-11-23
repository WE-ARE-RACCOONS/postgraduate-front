import { ModalBtnProps } from "@/types/button/modalBtn";
import { StyledModalBtn } from "./ModalBtn.styled";

function ModalBtn(props: ModalBtnProps) {
  return(
    <StyledModalBtn onClick={props.modalHandler} >{props.btnText}</StyledModalBtn>
  )
}

export default ModalBtn;