'use client';
import { MatchingFormProps } from "@/types/matching/matching";
import { MatchingFormContainer, MatchingFormHeader, MatchingFormTitle } from "./MatchingForm.styled";

function MatchingForm(props: MatchingFormProps) {
  return(
    <MatchingFormContainer>
      <MatchingFormHeader>
        <MatchingFormTitle>
          <div id="matching-form-title">{props.title}</div>
          <div id="matching-form-isrequired">{props.isRequired ? '(필수)' : '(선택)'}</div>
        </MatchingFormTitle>
        <div id="matching-form-char-count">0/{props.maxLength}자</div>
      </MatchingFormHeader>
      <textarea 
        name="matching-info" 
        id="matching-info-form" 
        placeholder={`${props.placeholder}`}></textarea>
    </MatchingFormContainer>
  )
}

export default MatchingForm;