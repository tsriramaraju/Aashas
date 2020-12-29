import React from 'react';
import styles from './chips.module.scss';
type props = {
  text: string;
  onClick: () => void;
  selected?: boolean;
};

const Chips = ({ onClick, text, selected = false }: props) => {
  return (
    <div
      onClick={onClick}
      className={selected ? styles.chipSelected : styles.chip}
    >
      {text}
    </div>
  );
};

export { Chips };
