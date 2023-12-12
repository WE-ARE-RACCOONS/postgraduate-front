import { InputFormProps } from '@/types/form/inputForm'
import React from 'react'

function InputForm(props:InputFormProps) {
  return (
    <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
  )
}

export default InputForm
