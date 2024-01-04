import { SelectCalendarContainer, SelectCalendarHeader } from "./SelectCalendar.styled";
import Image from "next/image";
import back_arrow from '../../../../public/arrow.png';
import Calendar from 'react-calendar';
import { useState } from "react";
import { SelectedDate } from "@/types/content/selectCalendar";

function SelectCalendar({ modalHandler } : { modalHandler: () => void }) {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

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
      <Calendar onChange={setSelectedDate} value={selectedDate} />
    </SelectCalendarContainer>
  )
}

export default SelectCalendar;