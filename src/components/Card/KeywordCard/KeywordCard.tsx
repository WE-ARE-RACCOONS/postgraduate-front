import { KeywordCardProps } from '@/types/card/keywordCard';
import {
  KeywordCardArrayBox,
  KeywordCardContainer,
  KeywordCardEl,
} from './KeywordCard.styled';

function KeywordCard(props: KeywordCardProps) {
  return (
    <KeywordCardContainer>
      <div id="keyword-card-lab-name">{props.lab || '연구실 이름'}</div>
      <KeywordCardArrayBox>
        {props.keyword &&
          props.keyword.length > 0 &&
          props.keyword.map((el, idx) => (
            <KeywordCardEl key={idx}>{el}</KeywordCardEl>
          ))}
      </KeywordCardArrayBox>
    </KeywordCardContainer>
  );
}

export default KeywordCard;
