export type TimeListObj = {
  day: string;
  startTime: string;
  endTime: string;
}

export interface TimeListBoxProps {
  timeArr: Array<TimeListObj>
}