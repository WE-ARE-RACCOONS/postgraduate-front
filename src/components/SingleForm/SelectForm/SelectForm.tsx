import SelectedBtn from '@/components/Button/SelectedBtn';
import { useEffect, useState } from 'react';
import {
  FieldInputFormBox,
  SelectFormBtnContainer,
  SelectFormContainer,
  SelectFormWrapper,
} from './SelectForm.styled';
import SingleValidator from '@/components/Validator/SingleValidator';
import { SelectFormProps } from '@/types/form/selectForm';
import { sFieldAtom, selectedFieldAtom, totalFieldAtom } from '@/stores/senior';
import { useAtom, useSetAtom } from 'jotai';
import ClickedBtn from '@/components/Button/ClickedBtn';
import { SELECT_FIELD_TEXT } from '@/constants/field/field';

function SelectForm(props: SelectFormProps) {
  const [totalBtns, setTotalBtns] = useAtom(totalFieldAtom);
  const [selected, setSelected] = useAtom(selectedFieldAtom);
  const setSField = useSetAtom(sFieldAtom);
  const [flag, setFlag] = useState(false);
  const [userInputField, setUserInputField] = useState('');
  const [inputCount, setInputCount] = useState(0);
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
    if (userInputField && inputCount < 6) {
      setTotalBtns([...totalBtns, userInputField]);
      setSelected([...selected, userInputField]);
      setInputCount(inputCount + 1);
      const inputEl = document.getElementById(
        'field-input-form',
      ) as HTMLInputElement;
      if (inputEl) inputEl.value = '';
    }
  };

  useEffect(() => {
    if (selected.length > 0) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [selected]);

  return (
    <SelectFormContainer>
      <SelectFormWrapper>
        <h3 id="select-field-title">{SELECT_FIELD_TEXT.fieldTitle}</h3>
        <div id="select-field-subtitle">
          <div id="select-field-subtitle-text">
            <div id="field-text">{SELECT_FIELD_TEXT.fieldText}</div>
            <div id="field-star">*</div>
          </div>
          {flag && <div id="field-alert">{SELECT_FIELD_TEXT.fieldAlert}</div>}
        </div>
        <div id="select-field-direction">
          {SELECT_FIELD_TEXT.fieldDirection}
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
        </SelectFormBtnContainer>
        <FieldInputFormBox>
          <input
            id="field-input-form"
            type="text"
            style={{fontSize:'16px'}}
            placeholder={SELECT_FIELD_TEXT.fieldInputDirection}
            onChange={(e) => setUserInputField(e.currentTarget.value)}
            maxLength={10}
          />
          <button id="field-input-btn" onClick={handleAddOtherField}>
            {SELECT_FIELD_TEXT.fieldInputBtnText}
          </button>
        </FieldInputFormBox>
      </SelectFormWrapper>
      {flag ? (
        <button id="field-submit-btn-non">확인</button>
      ) : (
        <button id="field-submit-btn" onClick={handleConfirm}>
          확인
        </button>
      )}
    </SelectFormContainer>
  );
}

export default SelectForm;
