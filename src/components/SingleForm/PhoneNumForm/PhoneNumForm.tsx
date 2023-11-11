'use client';
import SingleValidator from "@/components/Validator/SingleValidator";
import { PhoneNumContainer } from "./PhoneNumForm.styled";
import { useState } from "react";

function PhoneNumForm() {
  const [flag, setFlag] = useState(false); // 최초 입력 체크하는 flag

  

  return (
    <div>
      <h3>휴대번호를 입력해주세요</h3>
      <PhoneNumContainer>
        <input type="text" id="phone-num-input-fir" className="phone-num-input" />
        <div>-</div>
        <input type="text" id="phone-num-input-sec" className="phone-num-input" />
        <div>-</div>
        <input type="text" id="phone-num-input-thi" className="phone-num-input" />
      </PhoneNumContainer>
      {flag && <SingleValidator textColor='#FF3347' msg="010-0000-0000의 형식으로 입력해주세요" />}
    </div>
  )
}

export default PhoneNumForm;