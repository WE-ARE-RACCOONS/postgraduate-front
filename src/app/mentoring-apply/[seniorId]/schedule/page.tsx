'use client';
import ProgressBar from "@/components/Bar/ProgressBar";
import TimeListBox from "@/components/Box/TimeListBox";
import BackHeader from "@/components/Header/BackHeader";
import { MENTORING_SCHEDULE } from "@/constants/form/cMentoringApply";
import styled from "styled-components";

function MentoringApplySchedulePage() {
  const timeArr = [
    {
      "day": "월",
      "startTime": "18:00",
      "endTime": "12:00"
    },
    {
      "day": "화",
      "startTime": "18:00",
      "endTime": "12:00"
    },
    {
      "day": "수",
      "startTime": "18:00",
      "endTime": "12:00"
    }
  ]

  return(
    <MASContainer>
      <BackHeader headerText="멘토링 일정 제안" />
      <ProgressBar activeNum={1} />
      <div id="senior-schedule-title-wrapper">
        <MASTitle>{MENTORING_SCHEDULE.sScheduleTitle}</MASTitle>
      </div>
      <div id="senior-schedule-subtitle-wrapper">
        <MASSubtitle>{MENTORING_SCHEDULE.sScheduleSubtitle}</MASSubtitle>
      </div>
      <div id="time-list-box-wrapper">
        <TimeListBox timeArr={timeArr} />
      </div>
    </MASContainer>
  )
}

const MASContainer = styled.div`
  width: inherit;
  height: 100%;
  position: relative;

  #senior-schedule-title-wrapper {
    position: absolute;
    width: 95%;
    height: 1.375rem;
    top: 5.25rem;
    left: 0.5rem;
  }

  #senior-schedule-subtitle-wrapper {
    position: absolute;
    width: 95%;
    height: 1.25rem;
    top: 6.875rem;
    left: 0.5rem;
  }

  #time-list-box-wrapper {
    position: absolute;
    width: 95%;
    height: 11rem;
    top: 8.625rem;
    left: 50%;
    transform: translateX(-50%);
  }
`

const MASTitle = styled.div`
  width: 100%;
  height: 1.375rem;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.5px;
`

const MASSubtitle = styled.div`
  width: 100%;
  height: 1.25rem;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.5px;
  color: #868E96;
`

export default MentoringApplySchedulePage;