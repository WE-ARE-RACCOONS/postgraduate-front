'use client';
import { MatchingFormContainer, MatchingFormHeader, MatchingFormTitle } from "./MatchingForm.styled";

function MatchingForm() {
  return(
    <MatchingFormContainer>
      <MatchingFormHeader>
        <MatchingFormTitle>
          <div id="matching-form-title">희망 대학원/학과</div>
          <div id="matching-form-isrequired">(선택)</div>
        </MatchingFormTitle>
        <div id="matching-form-char-count">0/50자</div>
      </MatchingFormHeader>
      <textarea 
        name="matching-info" 
        id="matching-info-form" 
        placeholder={`예시)\n연세대학원 / 컴퓨터과학과\n카이스트 대학원 / 생명화학공학과`}></textarea>
    </MatchingFormContainer>
  )
}

export default MatchingForm;