import React, {InputHTMLAttributes} from 'react';
import s from './index.module.sass';
import {ControllerRenderProps} from 'react-hook-form'
import {nanoid} from "nanoid";

interface formInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  field: ControllerRenderProps<any, any>
}
const FormInput = ({label, errorMessage, field, ...rest}: formInputProps) => {
  const id = nanoid()
  return (
    <div className={s.formInput}>
      <input id={id} placeholder={' '} {...field} {...rest}/>
      <label htmlFor={id}>{label}</label>
      {errorMessage && <div className={s.error}>{errorMessage}</div>}
    </div>
  );
};

export default FormInput;