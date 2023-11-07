import React from 'react';
import styled from 'styled-components';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <StyledInput
      type="checkbox"
      checked={checked}
      onChange={({ target: { checked } }) => onChange(checked)}
    ></StyledInput>
  );
}
const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url('');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #333a3d;
  }
`;
export default Checkbox;
