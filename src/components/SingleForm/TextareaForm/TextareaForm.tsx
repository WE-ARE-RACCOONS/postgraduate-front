import { TextareaFormProps } from "@/types/form/textareaForm";
import { TextareaFormContainer, TextareaFormTop } from "./TextareaForm.styled";
import { useState } from "react";
import { useSetAtom } from "jotai";
import SingleValidator from "@/components/Validator/SingleValidator";

function TextareaForm(props: TextareaFormProps) {
  const [charCnt, setCharCnt] = useState(0);
  const [flag, setFlag] = useState(false);
  const setContent = useSetAtom(props.targetAtom);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;

    if(target.value.length < 10) setFlag(true);
    else setFlag(false);

    setCharCnt(target.value.length);
    setContent(target.value);
  }

  return(
    <TextareaFormContainer>
      <TextareaFormTop>
        <div id="textarea-form-top-title">{props.title}</div>
        <div id="textarea-form-top-char-count">{charCnt} / {props.maxCount}자</div>
      </TextareaFormTop>
      <textarea className={flag ? 'alert' : ''} placeholder={props.placeholder} onChange={(e) => {changeHandler(e)}} />
      {flag && <SingleValidator msg={props.alertMsg} textColor="#ff0000" />}
    </TextareaFormContainer>
  )
}

export default TextareaForm;