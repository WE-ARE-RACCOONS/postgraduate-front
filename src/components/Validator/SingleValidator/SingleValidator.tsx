import { SingleValidatorProps } from '@/types/validator/singleValidator';
import { SingleValidatorContainer } from './SingleValidator.styled';
import Image from 'next/image';
import alert_x from '../../../../public/alert_x.png';
import alert_o from '../../../../public/alert_o.png'
function SingleValidator(props: SingleValidatorProps) {
  return (
    <SingleValidatorContainer color={props.textColor}>
      <Image id="alert-x-img"
        src={props.textColor === '#FF3347' ? alert_x : alert_o}
        alt={props.textColor === '#FF3347' ? '경고 X' : '성공 0'} />
      {props.msg}
    </SingleValidatorContainer>
  );
}

export default SingleValidator;
