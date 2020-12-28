import React from 'react';
import styles from './searchIcon.module.scss';
import { motion } from 'framer-motion';

type props = {
  onClick: () => void;
  color?: 'transparent';
  layoutID?: string;
};

const SearchIcon = ({ onClick, color, layoutID = 'searchBox' }: props) => {
  return (
    <motion.div
      className={styles.icon}
      layoutId={layoutID}
      onClick={onClick}
      style={{ backgroundColor: color === 'transparent' ? '' : '#E63946' }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        layoutId="searchIcon"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </motion.svg>
    </motion.div>
  );
};

export default SearchIcon;
