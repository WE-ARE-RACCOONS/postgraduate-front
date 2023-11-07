import React from 'react';
import { StyledInput } from './CheckBox.styled';
import { CheckboxProps } from '@/types/checkbox/checkbox';

function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <StyledInput
      type="checkbox"
      checked={checked}
      onChange={({ target: { checked } }) => onChange(checked)}
    ></StyledInput>
  );
}
export default Checkbox;
