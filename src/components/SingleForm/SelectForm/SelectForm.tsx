import SelectedBtn from "@/components/Button/SelectedBtn";
import { useState } from "react";
import { SelectFormBtnContainer, SelectFormContainer } from "./SelectForm.styled";

function SelectForm() {
  // 추후 연구분야 상수 처리
  const [totalBtns, setTotalBtns] = useState(['인공지능', '반도체', '바이오', '에너지']);
  const [selected, setSelected] = useState([]);

  return(
    <SelectFormContainer>
      <div id="select-form-direction">여러 분야에 걸쳐 있을 경우,<br />모두 선택할 때 매칭 성사율이 올라가요</div>
      <SelectFormBtnContainer>
        {totalBtns && 
          totalBtns.map((el, idx) => (
            <SelectedBtn btnText={el} key={idx} />
          ))
        }
      </SelectFormBtnContainer>
    </SelectFormContainer>
  )
}

export default SelectForm;