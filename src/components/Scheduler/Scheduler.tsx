import { SchedulerProps, TimeObj } from "@/types/scheduler/scheduler";
import { SchedulerContainer, SchedulerEmptyBox } from "./Scheduler.styled";
import { PROFILE_SUB_DIRECTION } from "@/constants/form/cProfileForm";
import { useEffect, useState } from "react";

function Scheduler(props: SchedulerProps) {
  const [timeData, setTimeData] = useState<Array<TimeObj>>([]);

  useEffect(() => {
    setTimeData(props.times);
  }, []);

  return(
    <SchedulerContainer>
      {(timeData.length <= 0) && (
        <SchedulerEmptyBox>
          <div>{PROFILE_SUB_DIRECTION.addTimeEmpty}</div>
          <button>+추가하기</button>
        </SchedulerEmptyBox>
      )}
    </SchedulerContainer>
  )
}

export default Scheduler;