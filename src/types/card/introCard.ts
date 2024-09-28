export type TimeType = {
  day: string;
  startTime: string;
  endTime: string;
};

export interface IntroCardProps {
  info: string;
  target: string;
  times: Array<TimeType>;
}
