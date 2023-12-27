'use client';
import BackHeader from "@/components/Header/BackHeader";
import styled from "styled-components";

function SeniorInfoPage() {
  return(
    <SeniorInfoPageContainer>
      <BackHeader headerText="멘토 선배 소개" />
    </SeniorInfoPageContainer>
  )
}

const SeniorInfoPageContainer = styled.div`
  width: inherit;
  height: 100%;
`

export default SeniorInfoPage;