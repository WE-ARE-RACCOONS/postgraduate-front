import { SingleValidatorProps } from '@/types/validator/singleValidator';
import { SingleValidatorContainer } from './SingleValidator.styled';
import Image from 'next/image';
import alert_x from '../../../../public/alert_x.png';

function SingleValidator(props: SingleValidatorProps) {
  return (
    <SingleValidatorContainer color={props.textColor}>
      <Image id="alert-x-img" src={alert_x} alt="경고 X" />
      {props.msg}
    </SingleValidatorContainer>
  );
}

export default SingleValidator;
