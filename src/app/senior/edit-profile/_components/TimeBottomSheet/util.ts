import { AddTimeItemsType } from './TimeBottomSheet';

/**
 * 시간 validate
 */
export const validateTimeField = (data: AddTimeItemsType) => {
  const { startTime, endTime } = data;

  const startTotalMinutes =
    parseInt(startTime.hour) * 60 + parseInt(startTime.minutes);
  const endTotalMinutes =
    parseInt(endTime.hour) * 60 + parseInt(endTime.minutes);

  console.log(
    endTotalMinutes >= startTotalMinutes,
    '????',
    startTotalMinutes,
    endTotalMinutes,
  );

  return endTotalMinutes > startTotalMinutes;
};

/**
 * 요일 validate
 */
export const validateDayField = (data: AddTimeItemsType) => {
  const { day } = data;

  return day !== '';
};
