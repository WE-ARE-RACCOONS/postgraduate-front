'use client';

import { ReactNode } from 'react';
import { Path, useFormContext, FieldValues } from 'react-hook-form';
import { useExtractNumberHandler } from '@/hooks/useExtractNumberHandler';

import { ErrorMessage } from '@/components/ErrorMessage';
import * as S from './TextForm.styled';

interface InputPropsType<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  helperText?: string;
  className?: string;

  type: 'email' | 'text' | 'password';

  extractNumber?: boolean;
  button?: ReactNode | ReactNode[];
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * react-hook-form용 text input
 */
const Input = <T extends FieldValues>(props: InputPropsType<T>) => {
  const {
    name,
    button,
    type,
    helperText,
    extractNumber = false,
    className,
    value,
    ...rest
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = errors[name];
  const errorMessage = fieldError ? (fieldError.message as string) : null;

  const handleExtractNumber = useExtractNumberHandler();

  return (
    <>
      <S.Input
        style={{ border: fieldError && '2px solid red' }}
        id={name}
        type={type}
        value={value}
        {...(register(name),
        { onChange: (e) => extractNumber && handleExtractNumber(e) })}
        {...rest}
      >
        Input
      </S.Input>
      {fieldError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </>
  );
};

export default Input;
