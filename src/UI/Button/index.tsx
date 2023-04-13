import React from 'react';
import s from './index.module.sass';

interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement>{
  children: string

}
const Button = ({children}:ButtonProps) => {
  return (
    <button className={s.button}>
      {children}
    </button>
  );
};

export default Button;