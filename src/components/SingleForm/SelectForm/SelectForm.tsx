import SelectedBtn from '@/components/Button/SelectedBtn';
import { useState } from 'react';
import {
  FieldInputFormBox,
  SelectFormBtnContainer,
  SelectFormContainer,
  SelectFormWrapper,
} from './SelectForm.styled';
import { SelectFormProps } from '@/types/form/selectForm';
import { sFieldAtom, selectedFieldAtom, totalFieldAtom } from '@/stores/senior';
import { useAtom, useSetAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { SELECT_FIELD_TEXT } from '@/constants/field/field';

function SelectForm(props: SelectFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [totalBtns, setTotalBtns] = useAtom(totalFieldAtom);
  const [selected, setSelected] = useAtom(selectedFieldAtom);
  const setSField = useSetAtom(sFieldAtom);
  const [inputCount, setInputCount] = useState(0);

  const handleConfirm = () => {
    setSField(selected.join(','));
    props.clickHandler();
  };

  const handleAddOtherField = () => {
    if (watch('field') && inputCount < 6) {
      setTotalBtns([...totalBtns, watch('field')]);
      setSelected([...selected, watch('field')]);
      setInputCount(inputCount + 1);
      setValue('field', '');
    }
  };

  return (
    <SelectFormContainer>
      <SelectFormWrapper>
        <h3 id="select-field-title">{SELECT_FIELD_TEXT.fieldTitle}</h3>

        <div id="select-field-direction">
          <div>{SELECT_FIELD_TEXT.fieldDirection}</div>
          <div id="select-field-subtitle">
            {errors?.field?.message && (
              <div id="field-alert">*{SELECT_FIELD_TEXT.fieldAlert}</div>
            )}
          </div>
        </div>

        <SelectFormBtnContainer>
          {totalBtns &&
            totalBtns.map((el, idx) => (
              <SelectedBtn
                btnText={`${el}`}
                selected={selected}
                selectHandler={(newSelected) => {
                  setSelected(newSelected);
                  setSField(newSelected.join(','));
                }}
                key={idx}
              />
            ))}
        </SelectFormBtnContainer>
        <FieldInputFormBox>
          <input
            id="field-input-form"
            placeholder={SELECT_FIELD_TEXT.placeholder}
            {...register?.('field')}
          />
          <button id="field-input-btn" onClick={handleAddOtherField}>
            {SELECT_FIELD_TEXT.fieldInputBtnText}
          </button>
        </FieldInputFormBox>
      </SelectFormWrapper>
      {selected.length === 0 ? (
        <button id="field-submit-btn-non">저장</button>
      ) : (
        <button id="field-submit-btn" onClick={handleConfirm}>
          저장
        </button>
      )}
      <button className="field-close-btn" onClick={props.clickHandler}>
        닫기
      </button>
    </SelectFormContainer>
  );
}

export default SelectForm;
