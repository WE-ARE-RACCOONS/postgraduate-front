import { AddTimeAbleBottom, AddTimeAbleBox, AddTimeContainer, AddTimeDropdown, AddTimeDropdownBox, AddTimeDropdownSet, AddTimeWeekBox, AddTimeWeekBtn } from "./AddTime.styled";
import Image from "next/image";
import x_icon from '../../../../public/x.png';
import { WEEK_ARRAY } from "@/constants/form/cProfileForm";

function AddTime({ modalHandler } : { modalHandler: () => void }) {
  const hourOptions = Array.from({ length: 24 }, (_, index) => index);
  const minOptions = [0, 30];

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
        <AddTimeAbleBottom>
          <AddTimeDropdownBox>
            <div>시작 시간</div>
            <AddTimeDropdownSet>
              <AddTimeDropdown>
                {hourOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </AddTimeDropdown>
              <div>시</div>
              <AddTimeDropdown>
                {minOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </AddTimeDropdown>
              <div>분</div>
            </AddTimeDropdownSet>
          </AddTimeDropdownBox>
          <div>~</div>
          <AddTimeDropdownBox>
            <div>끝 시간</div>
            <AddTimeDropdownSet>
              <AddTimeDropdown>
                {hourOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </AddTimeDropdown>
              <div>시</div>
              <AddTimeDropdown>
                {minOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </AddTimeDropdown>
              <div>분</div>
            </AddTimeDropdownSet>
          </AddTimeDropdownBox>
        </AddTimeAbleBottom>
      </AddTimeAbleBox>
    </AddTimeContainer>
  )
}

export default AddTime;