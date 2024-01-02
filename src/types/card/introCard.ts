export type TimeType = {
  day: string;
  startTime: string;
  endTime: string;
};

export interface IntroCardProps {
  oneLiner: string;
  info: string;
  target: string;
  times: Array<TimeType>;
}
