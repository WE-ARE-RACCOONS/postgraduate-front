import { TextareaFormProps } from "@/types/form/textareaForm";
import { TextareaFormContainer, TextareaFormTop } from "./TextareaForm.styled";
import { useState } from "react";
import { useAtom } from "jotai";

function TextareaForm(props: TextareaFormProps) {
  const [charCnt, setCharCnt] = useState(0);
  const [content, setContent] = useAtom(props.targetAtom);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    setCharCnt(target.value.length);
    setContent(target.value);
  }

  return(
    <TextareaFormContainer>
      <TextareaFormTop>
        <div id="textarea-form-top-title">{props.title}</div>
        <div id="textarea-form-top-char-count">{charCnt} / {props.maxCount}자</div>
      </TextareaFormTop>
      <textarea placeholder={props.placeholder} onChange={(e) => {changeHandler(e)}} />
    </TextareaFormContainer>
  )
}

export default TextareaForm;