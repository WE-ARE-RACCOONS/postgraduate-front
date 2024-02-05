import { TextareaFormProps } from '@/types/form/textareaForm';
import { TextareaFormContainer, TextareaFormTop } from './TextareaForm.styled';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import SingleValidator from '@/components/Validator/SingleValidator';

function TextareaForm(props: TextareaFormProps) {
  const [charCnt, setCharCnt] = useState(0);
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useAtom(props.targetAtom);

  useEffect(() => {
    if (content) {
      const formEl = document.getElementById(
        `textarea-${props.targetAtom.toString()}`,
      ) as HTMLTextAreaElement;
      if (formEl) formEl.value = content;
    }
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;

    if (target.value.length < 10) setFlag(true);
    else setFlag(false);

    if (target.value.length <= props.maxCount) {
      setCharCnt(target.value.length);
      setContent(target.value);
    }
  };

  return (
    <TextareaFormContainer>
      <TextareaFormTop>
        <div id="textarea-form-top-title">{props.title}</div>
        <div id="textarea-form-top-char-count">
          {charCnt} / {props.maxCount}자
        </div>
      </TextareaFormTop>
      <textarea
        id={`textarea-${props.targetAtom.toString()}`}
        className={flag ? 'alert' : ''}
        value={content}
        placeholder={props.placeholder}
        onChange={(e) => {
          changeHandler(e);
        }}
      />
      {flag && <SingleValidator msg={props.alertMsg} textColor="#FF3347" />}
    </TextareaFormContainer>
  );
}

export default TextareaForm;
