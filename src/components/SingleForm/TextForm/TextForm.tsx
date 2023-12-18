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

  return (
    <TextFormEl
      type="text"
      placeholder={props.placeholder}
      onChange={(e) => setTarget(e.currentTarget.value)}
      defaultValue={target}
    />
  );
}

export default TextForm;
