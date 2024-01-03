import { WEEK_ARRAY } from "@/constants/form/cProfileForm";
import { TimeListContainer, WeekEl, WeekListContainer } from "./TimeListBox.styled";
import { TimeListBoxProps } from "@/types/box/timeListBox";

function TimeListBox(props: TimeListBoxProps) {
  return(
    <TimeListContainer>
      <WeekListContainer>
        {WEEK_ARRAY.map((el, idx) => (
          <WeekEl key={idx} className={(props.timeArr.map(item => item.day)).includes(el) ? 'active' : ''}>{el}</WeekEl>
        ))}
      </WeekListContainer>
    </TimeListContainer>
  )
}

export default TimeListBox;