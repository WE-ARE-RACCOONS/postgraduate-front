import React from 'react';
import { StyledInput } from './CheckBox.styled';
// import { CheckboxProps } from '@/types/checkbox/checkbox';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};
function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <StyledInput
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
    ></StyledInput>
  );
}
export default Checkbox;
