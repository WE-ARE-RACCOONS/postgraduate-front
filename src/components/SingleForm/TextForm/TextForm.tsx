import { TextFormProps } from '@/types/form/textForm';
import { TextFormEl } from './TextForm.styled';
import { useAtom } from 'jotai';
import { sKeywordAtom, sLabAtom, sProfessorAtom } from '@/stores/senior';
import { PrimitiveAtom } from 'jotai';
import { useEffect, useState } from 'react';

function TextForm(props: TextFormProps) {
  const [targetAtom, setTargetAtom] = useState<PrimitiveAtom<string>>(sLabAtom);
  const [target, setTarget] = useAtom(targetAtom);

  useEffect(() => {
    switch (props.targetAtom) {
      case 'lab':
        setTargetAtom(sLabAtom);
        break;
      case 'professor':
        setTargetAtom(sProfessorAtom);
        break;
      case 'keyword':
        setTargetAtom(sKeywordAtom);
        break;
      default:
        break;
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    
    if (props.max && inputValue.length <= props.max) {
      setTarget(inputValue);
    }
    if (!props.max && inputValue.length <= 20) {
      setTarget(inputValue);
    }
    
  };

  return (
    <TextFormEl
      type="text"
      placeholder={props.placeholder}
      onChange={handleChange}
      value={target}
    />
  );
}

export default TextForm;
