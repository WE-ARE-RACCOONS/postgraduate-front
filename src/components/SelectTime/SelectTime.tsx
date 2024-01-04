import { SelectTimeProps } from '@/types/selectTime/selectTime';
import {
  SelectTimeContainer,
  SelectTimeContent,
  SelectTimeText,
} from './SelectTime.styled';
import Image from 'next/image';
import down_arrow from '../../../public/arrow-down.png';

function SelectTime(props: SelectTimeProps) {
  return (
    <SelectTimeContainer>
      <SelectTimeContent>
        <SelectTimeText>{props.placeholder}</SelectTimeText>
        <Image id="down-arrow" src={down_arrow} alt="아래 화살표" />
      </SelectTimeContent>
    </SelectTimeContainer>
  );
}

export default SelectTime;
