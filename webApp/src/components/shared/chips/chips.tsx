import React from 'react';
import styles from './chips.module.scss';
type props = {
  text: string;
  onClick: () => void;
};

const Chips = ({ onClick, text }: props) => {
  return (
    <div onClick={onClick} className={styles.chip}>
      {text}
    </div>
  );
};

export { Chips };
