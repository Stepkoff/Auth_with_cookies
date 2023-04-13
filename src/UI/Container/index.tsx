import React from 'react';
import s from './index.module.sass';

interface ContainerProps {
  children: React.ReactNode
}
const Container = ({children}:ContainerProps) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  );
};

export default Container;