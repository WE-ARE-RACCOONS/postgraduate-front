import { BorderedTextContainer } from './BorderedText.styled';

function BorderedText({ str }: { str: string }) {
  return <BorderedTextContainer>{str}</BorderedTextContainer>;
}

export default BorderedText;
