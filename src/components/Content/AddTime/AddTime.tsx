import { AddTimeAbleBottom, AddTimeAbleBox, AddTimeContainer, AddTimeDropdown, AddTimeDropdownBox, AddTimeDropdownSet, AddTimeWeekBox } from "./AddTime.styled";
import Image from "next/image";
import x_icon from '../../../../public/x.png';
import { WEEK_ARRAY } from "@/constants/form/cProfileForm";
import React, { useState } from "react";
import SingleValidator from "@/components/Validator/SingleValidator";

function AddTime({ modalHandler } : { modalHandler: () => void }) {
  const hourOptions = Array.from({ length: 24 }, (_, index) => index);
  const minOptions = [0, 30];
  const [inputWeek, setInputWeek] = useState('');
  const [startHour, setStartHour] = useState('0');
  const [startMin, setStartMin] = useState('0');
  const [endHour, setEndHour] = useState('0');
  const [endMin, setEndMin] = useState('0');

  const clickWeekHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const weekBtns = document.querySelectorAll('.add-time-week-btn');
    weekBtns.forEach((el) => {
      el.className = 'add-time-week-btn';
    });
    e.currentTarget.classList.add('active');
    setInputWeek(e.currentTarget.innerText);
  }

  const submitHandler = () => {
    console.log(inputWeek);
    console.log(startHour);
    console.log(startMin);
    console.log(endHour);
    console.log(endMin);
  }

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
          <button className="add-time-week-btn" key={idx} onClick={(e) => {clickWeekHandler(e)}}>{el}</button>
        ))}
      </AddTimeWeekBox>
      <AddTimeAbleBox>
        <h3>가능한 시간 선택</h3>
        <AddTimeAbleBottom>
          <AddTimeDropdownBox>
            <div>시작 시간</div>
            <AddTimeDropdownSet>
              <AddTimeDropdown onChange={(e) => setStartHour(e.currentTarget.value)}>
                {hourOptions.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </AddTimeDropdown>
              <div>시</div>
              <AddTimeDropdown onChange={(e) => setStartMin(e.currentTarget.value)}>
                {minOptions.map((value, idx) => (
                  <option key={idx} value={value}>
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
              <AddTimeDropdown onChange={(e) => setEndHour(e.currentTarget.value)}>
                {hourOptions.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </AddTimeDropdown>
              <div>시</div>
              <AddTimeDropdown onChange={(e) => setEndMin(e.currentTarget.value)}>
                {minOptions.map((value, idx) => (
                  <option key={idx} value={value}>
                    {value}
                  </option>
                ))}
              </AddTimeDropdown>
              <div>분</div>
            </AddTimeDropdownSet>
          </AddTimeDropdownBox>
        </AddTimeAbleBottom>
      </AddTimeAbleBox>
      <button id="add-time-submit-btn" onClick={submitHandler}>등록하기</button>
    </AddTimeContainer>
  )
}

export default AddTime;