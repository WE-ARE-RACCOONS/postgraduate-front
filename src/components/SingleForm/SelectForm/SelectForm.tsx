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
      <h3>연구 분야에 대해 알려주세요.</h3>
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
        {/* {otherBtn && (
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
        )} */}
      </SelectFormBtnContainer>
      {flag && (
        <SingleValidator msg="최소 1개 이상 입력해 주세요" textColor="#FF0000" />
      )}
      <button onClick={handleConfirm}>확인</button>
    </SelectFormContainer>
  );
}

export default SelectForm;
