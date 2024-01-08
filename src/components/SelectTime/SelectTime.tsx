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
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { MENTORING_SCHEDULE } from '@/constants/form/cMentoringApply';

function SelectTime(props: SelectTimeProps) {
  const { modal, modalHandler, portalElement } = useModal(
    'select-date-calendar',
  );
  const [inputValue, setInputValue] = useState(
    `${props.numStr}${MENTORING_SCHEDULE.selectPlaceholder}`,
  );
  const selectedTime = useAtomValue(props.targetAtom);

  function formatDate(date: string) {
    const dateParts = date.split('-'); // 입력된 문자열을 '-'를 기준으로 나눕니다.

    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
    const hour = parseInt(dateParts[3]);
    const minute = parseInt(dateParts[4]);

    const formattedDate = `${month}월 ${day}일 ${hour}시 ${
      minute == 0 ? '00' : '30'
    }분`;
    return formattedDate;
  }

  useEffect(() => {
    if (selectedTime) {
      setInputValue(`${props.numStr}번째 일정 : ${formatDate(selectedTime)}`);
      const element = document.querySelector('.disabled');
      if (element) element.className = 'abled';
    }
  }, [selectedTime]);

  return (
    <SelectTimeContainer onClick={modalHandler}>
      <SelectTimeContent>
        <SelectTimeText className="disabled">{inputValue}</SelectTimeText>
        <Image id="down-arrow" src={down_arrow} alt="아래 화살표" />
      </SelectTimeContent>
      {modal && portalElement
        ? createPortal(
            <FullModal
              modalType="select-date-calendar"
              modalHandler={modalHandler}
              targetAtom={props.targetAtom}
            />,
            portalElement,
          )
        : null}
    </SelectTimeContainer>
  );
}

export default SelectTime;
