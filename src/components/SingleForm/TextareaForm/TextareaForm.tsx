import { TextareaFormProps } from "@/types/form/textareaForm";
import { TextareaFormContainer, TextareaFormTop } from "./TextareaForm.styled";
import { useState } from "react";

function TextareaForm(props: TextareaFormProps) {
  const [charCnt, setCharCnt] = useState(0);

  return(
    <TextareaFormContainer>
      <TextareaFormTop>
        <div id="textarea-form-top-title">{props.title}</div>
        <div id="textarea-form-top-char-count">{charCnt} / {props.maxCount}자</div>
      </TextareaFormTop>
      <textarea placeholder={props.placeholder} />
    </TextareaFormContainer>
  )
}

export default TextareaForm;