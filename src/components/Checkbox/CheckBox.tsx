'use client';
import React from 'react';
import checkedIcon from '../../../public/checkbox_o.png';
import uncheckedIcon from '../../../public/checkbox_x.png';
import cancelIcon from '../../../public/checkbox_c.png';

type CheckboxProps = {
  checked: boolean;
  onlyChecked?: boolean;
  onChange: (checked: boolean) => void;
  type: 'accept' | 'cancel';
};

function CheckBox({ checked, onChange, onlyChecked, type }: CheckboxProps) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{ cursor: 'pointer', marginRight: '0.56rem' }}
    >
      {checked ? (
        <img
          src={type === 'accept' ? checkedIcon.src : cancelIcon.src}
          style={{ width: '1.5rem', height: '1.5rem' }}
          alt="Checked Icon"
        />
      ) : (
        <img
          src={uncheckedIcon.src}
          style={{ width: '1.5rem', height: '1.5rem' }}
          alt="Unchecked Icon"
        />
      )}
    </div>
  );
}

export default CheckBox;
