import React, { useState } from 'react';
import { TextToggleButtonProps } from '@/types/mentoring/mentoring';

function TextToggleButton({ text }:TextToggleButtonProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {text.length > 500 ? (
        <div>
          {expanded ? text : `${text.slice(0, 500)}...`}
          <button onClick={toggleText}>
            {expanded ? '접기' : '더보기'}
          </button>
        </div>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
}

export default TextToggleButton;
