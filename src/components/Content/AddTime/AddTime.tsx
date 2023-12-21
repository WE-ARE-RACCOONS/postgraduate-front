import { AddTimeAbleBox, AddTimeContainer, AddTimeWeekBox, AddTimeWeekBtn } from "./AddTime.styled";
import Image from "next/image";
import x_icon from '../../../../public/x.png';
import { WEEK_ARRAY } from "@/constants/form/cProfileForm";

function AddTime({ modalHandler } : { modalHandler: () => void }) {
  return(
    <AddTimeContainer>
      <Image
        id="x-icon"
        src={x_icon}
        alt="계정 수정 모달 닫기 버튼"
        onClick={modalHandler}
      />
      <AddTimeWeekBox>
        <h3>요일 선택</h3>
        {WEEK_ARRAY.map((el, idx) => (
          <AddTimeWeekBtn key={idx}>{el}</AddTimeWeekBtn>
        ))}
      </AddTimeWeekBox>
      <AddTimeAbleBox>
        <h3>가능한 시간 선택</h3>
      </AddTimeAbleBox>
    </AddTimeContainer>
  )
}

export default AddTime;