import { SelectTimeProps } from '@/types/selectTime/selectTime';
import {
  SelectTimeContainer,
  SelectTimeContent,
  SelectTimeText,
  SelectTimeValidator,
  SelectTimeWrapper,
} from './SelectTime.styled';
import Image from 'next/image';
import down_arrow from '../../../public/arrow-down.png';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { MENTORING_SCHEDULE } from '@/constants/form/cMentoringApply';
import useFullModal from '@/hooks/useFullModal';

function SelectTime(props: SelectTimeProps) {
  const targetAtomValue = useAtomValue(props.targetAtom);
  const [thisFlag, setThisFlag] = useState(false);

  const { openModal: openSelectDateCalendarModal } = useFullModal({
    modalType: 'select-date-calendar',
    modalHandler: () => {},
  });
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

  useEffect(() => {
    if (props.checkTrigger && !targetAtomValue) {
      setThisFlag(true);
    } else setThisFlag(false);
  }, [props.checkTrigger]);

  useEffect(() => {
    if (targetAtomValue) setThisFlag(false);
  }, [targetAtomValue]);

  return (
    <SelectTimeWrapper>
      <SelectTimeContainer
        onClick={openSelectDateCalendarModal}
        $alertFlag={thisFlag}
      >
        <SelectTimeContent>
          <SelectTimeText className="disabled">{inputValue}</SelectTimeText>
          <Image id="down-arrow" src={down_arrow} alt="아래 화살표" />
        </SelectTimeContent>
      </SelectTimeContainer>
      {thisFlag && (
        <SelectTimeValidator>일정이 선택되지 않았습니다.</SelectTimeValidator>
      )}
    </SelectTimeWrapper>
  );
}

export default SelectTime;
