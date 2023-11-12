'use client';
import { MatchingFormProps } from "@/types/matching/matching";
import { MatchingFormContainer, MatchingFormHeader, MatchingFormTitle } from "./MatchingForm.styled";

function MatchingForm(props: MatchingFormProps) {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.value = e.currentTarget.value.slice(0, props.maxLength);
    props.handler(e.currentTarget.value);
  }
  
  return(
    <MatchingFormContainer>
      <MatchingFormHeader>
        <MatchingFormTitle>
          <div id="matching-form-title">{props.title}</div>
          <div id="matching-form-isrequired">{props.isRequired ? '(필수)' : '(선택)'}</div>
        </MatchingFormTitle>
        <div id="matching-form-char-count">{props.charCount}/{props.maxLength}자</div>
      </MatchingFormHeader>
      <textarea 
        name="matching-info" 
        id="matching-info-form" 
        placeholder={`${props.placeholder}`}
        onChange={(e) => handleChange(e)}></textarea>
    </MatchingFormContainer>
  )
}

export default MatchingForm;