import { SelectCalendarContainer, SelectCalendarHeader } from "./SelectCalendar.styled";
import Image from "next/image";
import back_arrow from '../../../../public/arrow.png';
import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import { SelectedDate } from "@/types/content/selectCalendar";
import { useAtom } from "jotai";
import { sAbleMentoringTimeArr } from "@/stores/mentoring";

function SelectCalendar({ modalHandler } : { modalHandler: () => void }) {
  const [timeArr, setTimeArr] = useAtom(sAbleMentoringTimeArr);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  useEffect(() => {
    const prevBtn = document.querySelector('.react-calendar__navigation__prev-button');
    const nextBtn = document.querySelector('.react-calendar__navigation__next-button');
    
    if(prevBtn) {
      prevBtn.addEventListener('click', () => {console.log('prev')});
    }

    if(nextBtn) {
      nextBtn.addEventListener('click', () => {console.log('next')});
    }
  }, []);

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
    </SelectCalendarContainer>
  )
}

export default SelectCalendar;