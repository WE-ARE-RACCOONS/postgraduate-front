import { IntroCardProps } from '@/types/card/introCard';
import {
  IntroCardContainer,
  IntroCardTextBox,
  IntroCardTextDesc,
  IntroCardTimeBox,
} from './IntroCard.styled';
import { EMPTY_SENIOR_INFO } from '@/constants/profile/emptySenior';

function IntroCard(props: IntroCardProps) {
  const setAmOrPm = (time: number) => {
    return time < 12 ? '오전' : '오후';
  };

  const formatTime = (startTime: string, endTime: string) => {
    const startTimeNum = Number(startTime.slice(0, 2));
    const endTimeNum = Number(endTime.slice(0, 2));
    return `${setAmOrPm(startTimeNum)} ${startTimeNum}시 ~ ${setAmOrPm(
      endTimeNum,
    )} ${endTimeNum}시`;
  };

  return (
    <IntroCardContainer>
      <IntroCardTextBox $isFull={!!props.info}>
        {props.info || EMPTY_SENIOR_INFO.info}
      </IntroCardTextBox>
      <IntroCardTextDesc>이런 후배에게 추천해요</IntroCardTextDesc>
      <IntroCardTextBox $isFull={!!props.target}>
        {props.target || EMPTY_SENIOR_INFO.info}
      </IntroCardTextBox>
      <IntroCardTextDesc>멘토링 가능 일정</IntroCardTextDesc>
      {props.times &&
        props.times.map((el, idx) => (
          <IntroCardTimeBox key={idx}>
            {el.day}요일 {formatTime(el.startTime, el.endTime)}
          </IntroCardTimeBox>
        ))}
      {props.times.length == 0 && (
        <IntroCardTextBox $isFull={props.times.length > 0}>
          {EMPTY_SENIOR_INFO.times}
        </IntroCardTextBox>
      )}
    </IntroCardContainer>
  );
}

export default IntroCard;
