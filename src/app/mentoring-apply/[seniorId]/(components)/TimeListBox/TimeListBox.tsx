import { WEEK_ARRAY } from '@/constants/form/cProfileForm';
import {
  TimeDay,
  TimeEl,
  TimeListArray,
  TimeListContainer,
  TimeTerm,
  WeekEl,
  WeekListContainer,
} from './TimeListBox.styled';
import { TimeListBoxProps } from '@/types/box/timeListBox';

function TimeListBox(props: TimeListBoxProps) {
  const formatTime = (start: string, end: string) => {
    const startArr = start.split(':');
    const endArr = end.split(':');
    return `${startArr[0]}시${
      startArr[1] == '00' ? '' : ` ${startArr[1]}분`
    } ~ ${endArr[0]}시${endArr[1] == '00' ? '' : ` ${endArr[1]}분`}`;
  };

  return (
    <TimeListContainer>
      <WeekListContainer>
        {WEEK_ARRAY.map((el, idx) => (
          <WeekEl
            key={idx}
            className={
              props.timeArr.map((item) => item.day).includes(el) ? 'active' : ''
            }
          >
            {el}
          </WeekEl>
        ))}
      </WeekListContainer>
      <TimeListArray>
        {props.timeArr.map((el, idx) => (
          <TimeEl key={idx}>
            <TimeDay>{el.day}요일</TimeDay>
            <TimeTerm>{formatTime(el.startTime, el.endTime)}</TimeTerm>
          </TimeEl>
        ))}
      </TimeListArray>
    </TimeListContainer>
  );
}

export default TimeListBox;
