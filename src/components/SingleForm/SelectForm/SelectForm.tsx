import SelectedBtn from "@/components/Button/SelectedBtn";
import { useEffect, useState } from "react";
import { SelectFormBtnContainer, SelectFormContainer } from "./SelectForm.styled";
import SingleValidator from "@/components/Validator/SingleValidator";
import { SelectFormProps } from "@/types/form/selectForm";
import { selectedFieldAtom, totalFieldAtom } from "@/stores/senior";
import { useAtom } from "jotai";

function SelectForm(props: SelectFormProps) {
  // 추후 연구분야 상수 처리
  const [totalBtns, setTotalBtns] = useAtom(totalFieldAtom);
  const [selected, setSelected] = useAtom(selectedFieldAtom);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const handleConfirm = () => {
    if(selected.length == 0) setFlag(true);
    else {
      setFlag(false);
      props.clickHandler();
    }
  }

  return(
    <SelectFormContainer>
      <div id="select-form-direction">여러 분야에 걸쳐 있을 경우,<br />모두 선택할 때 매칭 성사율이 올라가요</div>
      <SelectFormBtnContainer>
        {totalBtns && 
          totalBtns.map((el, idx) => (
            <SelectedBtn 
              btnText={el}
              selected={selected}
              selectHandler={setSelected} 
              key={idx} />
          ))
        }
      </SelectFormBtnContainer>
      {flag && <SingleValidator msg="연구분야를 선택해주세요" textColor="#FF0000" />}
      <button id="select-form-confirm-btn" onClick={handleConfirm}>확인</button>
    </SelectFormContainer>
  )
}

export default SelectForm;