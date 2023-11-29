import { TextFieldContainer } from './TextField.styled';

function TextField({ content }: { content: string }) {
  return (
    <TextFieldContainer>
      <div id="text-field-content">{content}</div>
    </TextFieldContainer>
  );
}

export default TextField;
