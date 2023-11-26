import { SelectedBtnProps } from "@/types/button/selectedBtn";
import { StyledSelectedBtn } from "./SelectedBtn.styled";
import { useState } from "react";

function SelectedBtn(props: SelectedBtnProps) {
  const [selected, setSelected] = useState(false);

  return(
    <StyledSelectedBtn $selected={selected} onClick={() => {setSelected(!selected)}} >{props.btnText}</StyledSelectedBtn>
  )
}

export default SelectedBtn;