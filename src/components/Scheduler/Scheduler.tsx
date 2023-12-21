import { SchedulerProps, TimeObj } from "@/types/scheduler/scheduler";
import { SchedulerContainer, SchedulerEl, SchedulerElContainer, SchedulerEmptyBox } from "./Scheduler.styled";
import { PROFILE_SUB_DIRECTION } from "@/constants/form/cProfileForm";
import React, { useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import { createPortal } from "react-dom";
import FullModal from "../Modal/FullModal";
import { useAtom } from "jotai";
import { sAbleTime } from "@/stores/senior";

function Scheduler() {
  const [timeData, setTimeData] = useAtom(sAbleTime);
  const { modal, modalHandler, portalElement } = useModal('senior-mentoring-time-portal');

  const clickHandler = (removeIdx: number) => {
    setTimeData(timeData.filter((_, idx) => idx !== removeIdx));
  }

  return(
    <SchedulerContainer>
      {(timeData.length <= 0) ? (
        <SchedulerEmptyBox>
          <div>{PROFILE_SUB_DIRECTION.addTimeEmpty}</div>
          <button onClick={modalHandler}>+추가하기</button>
        </SchedulerEmptyBox>
      ) : (
        <SchedulerElContainer>
          {timeData.map((el, idx) => (
            <SchedulerEl key={idx}>
              <div id="scheduler-el-time">{el.startTime} ~ {el.endTime} ({el.day})</div>
              <button id="scheduler-el-remove-btn" onClick={() => clickHandler(idx)}>삭제</button>
            </SchedulerEl>
          ))}
          <button onClick={modalHandler}>+추가하기</button>
        </SchedulerElContainer>
        )}
      {modal && portalElement
        ? createPortal(
            <FullModal modalType="senior-mentoring-time" modalHandler={modalHandler} />,
            portalElement,
          )
        : ''}
    </SchedulerContainer>
  )
}

export default Scheduler;