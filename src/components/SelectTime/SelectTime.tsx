import { SelectTimeProps } from '@/types/selectTime/selectTime';
import {
  SelectTimeContainer,
  SelectTimeContent,
  SelectTimeText,
} from './SelectTime.styled';
import Image from 'next/image';
import down_arrow from '../../../public/arrow-down.png';
import useModal from '@/hooks/useModal';
import { createPortal } from 'react-dom';
import FullModal from '../Modal/FullModal';

function SelectTime(props: SelectTimeProps) {
  const { modal, modalHandler, portalElement } = useModal('select-date-calendar');

  return (
    <SelectTimeContainer onClick={modalHandler}>
      <SelectTimeContent>
        <SelectTimeText>{props.placeholder}</SelectTimeText>
        <Image id="down-arrow" src={down_arrow} alt="아래 화살표" />
      </SelectTimeContent>
      {modal && portalElement
        ? createPortal(
            <FullModal modalType="select-date-calendar" modalHandler={modalHandler} targetAtom={props.targetAtom} />,
            portalElement,
          )
        : null}
    </SelectTimeContainer>
  );
}

export default SelectTime;
