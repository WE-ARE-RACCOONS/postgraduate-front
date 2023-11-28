import SelectedBtn from '@/components/Button/SelectedBtn';
import { useState } from 'react';
import {
  SelectFormBtnContainer,
  SelectFormContainer,
} from './SelectForm.styled';
import SingleValidator from '@/components/Validator/SingleValidator';
import { SelectFormProps } from '@/types/form/selectForm';
import { sFieldAtom, selectedFieldAtom, totalFieldAtom } from '@/stores/senior';
import { useAtom, useSetAtom } from 'jotai';
import ClickedBtn from '@/components/Button/ClickedBtn';

function SelectForm(props: SelectFormProps) {
  // 추후 연구분야 상수 처리
  const [totalBtns, setTotalBtns] = useAtom(totalFieldAtom);
  const [selected, setSelected] = useAtom(selectedFieldAtom);
  const setSField = useSetAtom(sFieldAtom);
  const [flag, setFlag] = useState(false);
  const [otherBtn, setOtherBtn] = useState(true);
  const [userInputField, setUserInputField] = useState('');

  const handleConfirm = () => {
    if (selected.length == 0) setFlag(true);
    else {
      setFlag(false);
      setSField(selected.join(','));
      props.clickHandler();
    }
  };

  const handleAddOtherField = () => {
    /**
     * 1. 전체 버튼 목록에 추가
     * 2. 해당 버튼 selected로 추가
     * 3. otherBtn true로
     */
    if (userInputField) {
      setTotalBtns([...totalBtns, userInputField]);
      setSelected([...selected, userInputField]);
    }
    setOtherBtn(true);
  };

  return (
    <SelectFormContainer>
      <div id="select-form-direction">
        여러 분야에 걸쳐 있을 경우,
        <br />
        모두 선택할 때 매칭 성사율이 올라가요
      </div>
      <SelectFormBtnContainer>
        {totalBtns &&
          totalBtns.map((el, idx) => (
            <SelectedBtn
              btnText={el}
              selected={selected}
              selectHandler={setSelected}
              key={idx}
            />
          ))}
        {otherBtn && (
          <button
            id="other-field-add-btn"
            onClick={() => {
              setOtherBtn(false);
            }}
          >
            +다른 분야
          </button>
        )}
        {!otherBtn && (
          <div>
            <input
              type="text"
              placeholder="분야를 입력해주세요"
              onChange={(e) => setUserInputField(e.currentTarget.value)}
            />
            <button id="other-field-save-btn" onClick={handleAddOtherField}>
              저장
            </button>
          </div>
        )}
      </SelectFormBtnContainer>
      {flag && (
        <SingleValidator msg="연구분야를 선택해주세요" textColor="#FF0000" />
      )}
      <ClickedBtn clickHandler={handleConfirm} btnText="확인" />
    </SelectFormContainer>
  );
}

export default SelectForm;
