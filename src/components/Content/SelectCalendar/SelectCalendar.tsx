import {
  SelectCalendarBtnContainer,
  SelectCalendarContainer,
  SelectCalendarHeader,
  SelectCalendarTimeContainer,
  SelectCalendarTimeList,
} from './SelectCalendar.styled';
import Image from 'next/image';
import back_arrow from '../../../../public/arrow.png';
import Calendar from 'react-calendar';
import React, { useEffect, useState } from 'react';
import { SelectedDate } from '@/types/content/selectCalendar';
import { useSetAtom, useAtomValue } from 'jotai';
import { sAbleMentoringTimeArr } from '@/stores/mentoring';
import {
  SELECT_CALENDAR_TEXT,
  WEEK_DAY_TO_NUM,
} from '@/constants/calendar/calendar';
import { useToast } from '@/hooks/useToast';
import { SelectCalendarProps } from '@/types/selectTime/selectTime';
import SelectTime from '@/components/SelectTime';

function SelectCalendar(props: SelectCalendarProps) {
  const timeArr = useAtomValue(sAbleMentoringTimeArr);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [ableTimeList, setAbleTimeList] = useState<
    Array<{ start: string; end: string }>
  >([]);
  const setFinalTime = useSetAtom(props.targetAtom);
  const weekObj = WEEK_DAY_TO_NUM;
  const toast = useToast();

  /** 30분 단위로 시간 간격을 끊어서 리턴해주는 함수 */
  function splitTimeRange(startTime: string, endTime: string) {
    let timeIntervals = [];

    let startDate = new Date(`01/01/2024 ${startTime}`);
    let endDate = endTime.includes('24')
      ? new Date(`01/02/2024 ${endTime.replace('24', '00')}`)
      : new Date(`01/01/2024 ${endTime}`);

    while (startDate < endDate) {
      let nextDate = new Date(startDate.getTime() + 30 * 60000);
      if (nextDate > endDate) {
        nextDate = endDate;
      }
      timeIntervals.push({
        start: startDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        end: nextDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      });
      startDate = nextDate;
    }

    return timeIntervals;
  }

  /** 객체에서 해당 value를 가지는 요소의 key를 반환하는 함수 */
  function getKeyByValue(
    object: { [key: string]: number },
    valueToFind: number,
  ) {
    return Object.keys(object).find((key) => object[key] === valueToFind);
  }

  /** (HH:MM, HH:MM) 형태의 시간을 받아서 "HH시 MM분 ~ HH시 MM분" 형태로 바꿔주는 함수 */
  function formatTimeKor(start: string, end: string) {
    let formattedStart = start.replace(':', '시 ');
    formattedStart += '분';
    let formattedEnd = end.replace(':', '시 ');
    formattedEnd += '분';

    return `${formattedStart} ~ ${formattedEnd}`;
  }

  /** 날짜 데이터를 YYYY-MM-DD 형태로 만드는 함수 */
  function formatDateHyphen(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /** 시간 데이터를 HH-MM 형태로 만드는 함수 */
  function formatTimeHyphen(time: string) {
    let formattedTime = time.replace('시 ', '-');
    formattedTime = formattedTime.replace(/\s*분\s*/g, '');
    return formattedTime;
  }

  useEffect(() => {
    const prevBtn = document.querySelector(
      '.react-calendar__navigation__prev-button',
    ) as HTMLElement;
    const nextBtn = document.querySelector(
      '.react-calendar__navigation__next-button',
    ) as HTMLElement;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevBtn.style.opacity = '0';
        prevBtn.style.cursor = 'none';
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
        nextBtn.style.opacity = '0';
        nextBtn.style.cursor = 'none';
      });
    }

    if (selectedDate) {
      // @ts-ignore
      const weekDay = getKeyByValue(weekObj, selectedDate.getDay());

      if (timeArr.length == 0) {
        setAbleTimeList(splitTimeRange('09:00', '24:30'));
        return;
      }

      let ableDay = false;
      timeArr.forEach((el) => {
        if (el.day == weekDay) {
          setAbleTimeList(splitTimeRange(el.startTime, el.endTime));
          ableDay = true;
        }
      });
      if (!ableDay) setAbleTimeList([]);
    }
  }, [selectedDate]);

  const timeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const timeList = document.querySelectorAll('.able-time');
    timeList.forEach((el) => {
      el.className = 'able-time';
    });
    e.currentTarget.classList.add('selected-time');
  };

  const nextBtnHandler = () => {
    // 날짜/시간 제대로 선택하지 않고 "입력" 눌렀을 때 스낵바 등 처리 필요할듯
    if (!selectedDate) {
      toast.addToast({ status: 'error', message: '날짜를 입력해주세요' });
      return;
    }

    const selectedTime = document.querySelector('.selected-time');
    if (!selectedTime) {
      toast.addToast({ status: 'error', message: '시간을 입력해주세요' });
      return;
    }

    const formattedDate = formatDateHyphen(selectedDate as Date);
    const formattedTime = formatTimeHyphen(selectedTime.innerHTML.slice(0, 8));
    setFinalTime(`${formattedDate}-${formattedTime}`);
    props.modalHandler();
  };

  return (
    <SelectCalendarContainer onClick={(e) => e.stopPropagation()}>
      <SelectCalendarHeader>
        <Image
          id="back-arrow-img"
          src={back_arrow}
          alt="뒤로가기 화살표"
          onClick={props.modalHandler}
        />
        <div id="header-text">일정 선택</div>
      </SelectCalendarHeader>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        calendarType="gregory"
        view="month"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
      />
      <SelectCalendarTimeContainer>
        <div id="select-calendar-time-text">
          {SELECT_CALENDAR_TEXT.selectTimeText}
        </div>
        <SelectCalendarTimeList>
          {ableTimeList.length > 0 ? (
            ableTimeList.map((el, idx) => (
              <div
                className={idx == 0 ? 'able-time selected-time' : 'able-time'}
                key={idx}
                onClick={(e) => timeClickHandler(e)}
              >
                {formatTimeKor(el.start, el.end)}
              </div>
            ))
          ) : (
            <div>해당 요일에 가능한 시간이 없습니다.</div>
          )}
        </SelectCalendarTimeList>
      </SelectCalendarTimeContainer>
      <SelectCalendarBtnContainer>
        <button id="select-calendar-prev-btn" onClick={props.modalHandler}>
          이전
        </button>
        <button id="select-calendar-next-btn" onClick={nextBtnHandler}>
          입력
        </button>
      </SelectCalendarBtnContainer>
    </SelectCalendarContainer>
  );
}

export default SelectCalendar;
