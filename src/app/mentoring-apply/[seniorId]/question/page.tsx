'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import BackHeader from "@/components/Header/BackHeader";
import styled from "styled-components";

function MentoringApplyQuestionPage() {
  return(
    <MAQContainer>
      <BackHeader headerText="신청서 작성" />
      <ProgressBar activeNum={0} />
    </MAQContainer>
  )
}

const MAQContainer = styled.div`
  width: inherit;
  height: auto;
  position: relative;
`

export default MentoringApplyQuestionPage;