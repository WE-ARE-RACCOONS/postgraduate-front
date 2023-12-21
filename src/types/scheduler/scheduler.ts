export type TimeObj = {
  day: string,
  startTime: string,
  endTime: string
}

export interface SchedulerProps {
  times: Array<TimeObj>
}