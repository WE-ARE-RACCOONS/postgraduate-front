'use client';
import React from 'react';
import checkedIcon from '../../../public/checkbox_o.png';
import uncheckedIcon from '../../../public/checkbox_x.png';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function CheckBox({ checked, onChange }: CheckboxProps) {
  return (
    <div onClick={() => onChange(!checked)} style={{ cursor: 'pointer',marginRight:'0.56rem' }}>
      {checked ? (
        <img src={checkedIcon.src} style={{ width: '1.5rem', height: '1.5rem' }} alt="Checked Icon" />
      ) : (
        <img src={uncheckedIcon.src} style={{ width: '1.5rem', height: '1.5rem' }} alt="Unchecked Icon" />
      )}
    </div>
  );
}

export default CheckBox;
