import React from 'react';

import styles from './button.module.scss';
type props = {
  onclick: () => void;

  children: string;
  color?: 'primary' | 'secondary';
  height?: string;
  width?: string;
  fontSize?: string;
  radius?: string;
};

const Button = ({
  children,
  onclick,
  color = 'primary',
  height = '50px',
  width = '250px',
  fontSize = '1em',
  radius = '24px',
}: props) => {
  return (
    <button
      style={{ height, width, fontSize, borderRadius: radius }}
      className={color === 'primary' ? styles.primary : styles.secondary}
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export { Button };
