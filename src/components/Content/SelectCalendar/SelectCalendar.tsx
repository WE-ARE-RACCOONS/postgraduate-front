import { SelectCalendarContainer, SelectCalendarHeader, SelectCalendarTimeContainer, SelectCalendarTimeList } from "./SelectCalendar.styled";
import Image from "next/image";
import back_arrow from '../../../../public/arrow.png';
import Calendar from 'react-calendar';
import React, { useEffect, useState } from "react";
import { SelectedDate } from "@/types/content/selectCalendar";
import { useAtom } from "jotai";
import { sAbleMentoringTimeArr } from "@/stores/mentoring";
import { SELECT_CALENDAR_TEXT, WEEK_DAY_TO_NUM } from "@/constants/calendar/calendar";

function SelectCalendar({ modalHandler } : { modalHandler: () => void }) {
  const [timeArr, setTimeArr] = useAtom(sAbleMentoringTimeArr);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [ableTimeList, setAbleTimeList] = useState<Array<{start: string, end: string}>>([]);
  const weekObj = WEEK_DAY_TO_NUM;

  /** 30분 단위로 시간 간격을 끊어서 리턴해주는 함수 */
  function splitTimeRange(startTime: string, endTime: string) {
    let timeIntervals = [];
    
    let startDate = new Date(`01/01/2024 ${startTime}`);
    let endDate = (endTime.includes('24')) ? new Date(`01/02/2024 ${endTime.replace('24', '00')}`) : new Date(`01/01/2024 ${endTime}`);
    
    while (startDate < endDate) {
      let nextDate = new Date(startDate.getTime() + 30 * 60000);
      if (nextDate > endDate) {
        nextDate = endDate;
      }
      timeIntervals.push({
        start: startDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}),
        end: nextDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
      });
      startDate = nextDate;
    }
    
    return timeIntervals;
  }

  /** 객체에서 해당 value를 가지는 요소의 key를 반환하는 함수 */
  function getKeyByValue(object: {[key: string]: number}, valueToFind: number) {
    return Object.keys(object).find(key => object[key] === valueToFind);
  }

  /** (HH:MM, HH:MM) 형태의 시간을 받아서 "HH시 MM분 ~ HH시 MM분" 형태로 바꿔주는 함수 */
  function formatTime(start: string, end: string) {
    let formattedStart = start.replace(':', '시 ');
    formattedStart += '분';
    let formattedEnd = end.replace(':', '시 ');
    formattedEnd += '분';
    
    return `${formattedStart} ~ ${formattedEnd}`;
  }

  useEffect(() => {
    const prevBtn = document.querySelector('.react-calendar__navigation__prev-button');
    const nextBtn = document.querySelector('.react-calendar__navigation__next-button');
    
    // if(prevBtn) {
    //   prevBtn.addEventListener('click', () => {console.log('prev')});
    // }

    // if(nextBtn) {
    //   nextBtn.addEventListener('click', () => {console.log('next')});
    // }

    if(selectedDate) {
      // @ts-ignore
      const weekDay = getKeyByValue(weekObj, selectedDate.getDay());
      let ableDay = false;
      timeArr.forEach((el) => {
        if(el.day == weekDay) {
          setAbleTimeList(splitTimeRange(el.startTime, el.endTime));
          ableDay = true;
        }
      })
      if(!ableDay) setAbleTimeList([]);
    }
  }, [selectedDate]);

  const timeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const timeList = document.querySelectorAll('.able-time');
    timeList.forEach((el) => {
      el.className = 'able-time';
    })
    e.currentTarget.classList.add('selected-time');
  }

  return(
    <SelectCalendarContainer onClick={(e) => e.stopPropagation()}>
      <SelectCalendarHeader>
        <Image
          id="back-arrow-img"
          src={back_arrow}
          alt="뒤로가기 화살표"
          onClick={modalHandler}
        />
        <div id="header-text">일정 선택</div>
      </SelectCalendarHeader>
      <Calendar 
        onChange={setSelectedDate} 
        value={selectedDate} 
        calendarType="gregory" 
        view="month"
        prev2Label={null}
        next2Label={null} />
      <SelectCalendarTimeContainer>
        <div id="select-calendar-time-text">{SELECT_CALENDAR_TEXT.selectTimeText}</div>
        <SelectCalendarTimeList>
          {(ableTimeList.length > 0) ? ableTimeList.map((el, idx) => (
            <div 
              className={idx == 0 ? 'able-time selected-time' : 'able-time'} 
              key={idx}
              onClick={e => timeClickHandler(e)}
            >{formatTime(el.start, el.end)}</div>
          )) : (<div>해당 요일에 가능한 시간이 없습니다.</div>)}
        </SelectCalendarTimeList>
      </SelectCalendarTimeContainer>
    </SelectCalendarContainer>
  )
}

export default SelectCalendar;