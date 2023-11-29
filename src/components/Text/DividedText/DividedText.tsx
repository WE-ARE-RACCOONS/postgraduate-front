import { DividedTextContainer } from './DividedText.styled';

function DividedText({ firStr, secStr }: { firStr: string; secStr: string }) {
  return (
    <DividedTextContainer>
      {firStr} | {secStr}
    </DividedTextContainer>
  );
}

export default DividedText;
