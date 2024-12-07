import { SingleValidatorProps } from '@/types/validator/singleValidator';
import { SingleValidatorContainer } from './SingleValidator.styled';

function SingleValidator(props: SingleValidatorProps) {
  return (
    <SingleValidatorContainer color={props.textColor}>
      *{props.msg}
    </SingleValidatorContainer>
  );
}

export default SingleValidator;
