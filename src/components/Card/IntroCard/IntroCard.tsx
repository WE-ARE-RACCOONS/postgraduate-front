import { IntroCardProps } from '@/types/card/introCard';
import {
  IntroCardContainer,
  IntroCardOneLiner,
  IntroCardTextBox,
  IntroCardTextDesc,
  IntroCardTimeBox,
} from './IntroCard.styled';
import { useEffect } from 'react';

function IntroCard(props: IntroCardProps) {
  useEffect(() => {
    console.log(props.times);
  }, []);

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
      <IntroCardOneLiner>
        {props.oneLiner ? `\"${props.oneLiner}\"` : '"잘 부탁드립니다!"'}
      </IntroCardOneLiner>
      <IntroCardTextBox>{props.info || ''}</IntroCardTextBox>
      <IntroCardTextDesc>이런 분들에게 추천드려요.</IntroCardTextDesc>
      <IntroCardTextBox>{props.target || ''}</IntroCardTextBox>
      <IntroCardTextDesc>멘토링 가능 일정</IntroCardTextDesc>
      {props.times &&
        props.times.map((el, idx) => (
          <IntroCardTimeBox key={idx}>
            {el.day}요일 {formatTime(el.startTime, el.endTime)}
          </IntroCardTimeBox>
        ))}
    </IntroCardContainer>
  );
}

export default IntroCard;
