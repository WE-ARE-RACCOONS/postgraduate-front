import { SchedulerProps, TimeObj } from "@/types/scheduler/scheduler";
import { SchedulerContainer, SchedulerEmptyBox } from "./Scheduler.styled";
import { PROFILE_SUB_DIRECTION } from "@/constants/form/cProfileForm";
import { useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import { createPortal } from "react-dom";
import FullModal from "../Modal/FullModal";
import { useAtom } from "jotai";
import { sAbleTime } from "@/stores/senior";

function Scheduler() {
  const [timeData, setTimeData] = useAtom(sAbleTime); // store의 sAbleTime으로 교체 필요
  const { modal, modalHandler, portalElement } = useModal('senior-mentoring-time-portal');

  return(
    <SchedulerContainer>
      {(timeData.length <= 0) && (
        <SchedulerEmptyBox>
          <div>{PROFILE_SUB_DIRECTION.addTimeEmpty}</div>
          <button onClick={modalHandler}>+추가하기</button>
        </SchedulerEmptyBox>
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