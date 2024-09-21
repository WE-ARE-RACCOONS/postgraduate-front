import { SingleValidatorProps } from '@/types/validator/singleValidator';
import { SingleValidatorContainer } from './SingleValidator.styled';
import Image from 'next/image';
import alert_x from '../../../../public/alert_x.png';
import alert_o from '../../../../public/alert_o.png';
function SingleValidator(props: SingleValidatorProps) {
  return (
    <SingleValidatorContainer color={props.textColor}>
      *{props.msg}
    </SingleValidatorContainer>
  );
}

export default SingleValidator;
