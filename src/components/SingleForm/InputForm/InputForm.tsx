import { InputFormProps } from '@/types/form/inputForm';
import React from 'react';
import {InputFormStyle} from './InputForm.styled'
function InputForm(props: InputFormProps) {
  return (
    <InputFormStyle
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}

export default InputForm;
