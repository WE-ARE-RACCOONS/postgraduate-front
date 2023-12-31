'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import BackHeader from "@/components/Header/BackHeader";
import { MENTORING_NOTICE } from "@/constants/form/cMentoringApply";
import styled from "styled-components";

function MentoringApplyQuestionPage() {
  return(
    <MAQContainer>
      <BackHeader headerText="신청서 작성" />
      <ProgressBar activeNum={0} />
      <MQANoticeBox>
        <div id="mentoring-notice-text-box">
          <div id="mentoring-notice-text" className="mentoring-notice">{MENTORING_NOTICE.noticeText}</div>
          <div id="mentoring-send-text" className="mentoring-notice">{MENTORING_NOTICE.sendText}</div>
          <div id="mentoring-alert-text" className="mentoring-notice">{MENTORING_NOTICE.alertText}</div>
        </div>
      </MQANoticeBox>
    </MAQContainer>
  )
}

const MAQContainer = styled.div`
  width: inherit;
  height: auto;
  position: relative;
`

const MQANoticeBox = styled.div`
  width: 95%;
  height: 5.75rem;
  border-radius: 8px;
  background-color: #F8F9FA;
  position: absolute;
  top: 4.75rem;
  left: 50%;
  transform: translateX(-50%);

  #mentoring-notice-text-box {
    width: max-content;
    height: 4rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .mentoring-notice {
    font-size: 14px;
    line-height: 140%;
    letter-spacing: -0.5px;
  }

  #mentoring-notice-text {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  #mentoring-alert-text {
    color: #2FC4B2;
  }
`

export default MentoringApplyQuestionPage;