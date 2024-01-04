import BackHeader from "@/components/Header/BackHeader";
import { SelectCalendarContainer, SelectCalendarHeader } from "./SelectCalendar.styled";
import Image from "next/image";
import back_arrow from '../../../../public/arrow.png';

function SelectCalendar({ modalHandler } : { modalHandler: () => void }) {
  return(
    <SelectCalendarContainer>
      <SelectCalendarHeader>
        <Image
          id="back-arrow-img"
          src={back_arrow}
          alt="뒤로가기 화살표"
          onClick={modalHandler}
        />
        <div id="header-text">일정 선택</div>
      </SelectCalendarHeader>
    </SelectCalendarContainer>
  )
}

export default SelectCalendar;