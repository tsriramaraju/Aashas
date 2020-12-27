import { motion } from 'framer-motion';
import * as React from 'react';
import style from '../../../sass/icons.module.scss';
type UserProps = {
  stroke: string;
  className?: string;
  changeNav: (nav: string) => void;
};

export function User({ stroke, className, changeNav }: UserProps) {
  return (
    <motion.div className={className} onClick={() => changeNav('user')} animate>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 106.12 118.63"
        stroke={stroke}
        className={style.icon}
        animate
      >
        <motion.g id="Layer_2" data-name="Layer 2">
          <motion.g id="Layer_1-2" data-name="Layer 1">
            <motion.g
              id="User"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="6px"
            >
              <motion.path
                className="cls-1"
                d="M103.12,115.63V103.12a25,25,0,0,0-25-25H28a25,25,0,0,0-25,25v12.51"
              />
              <motion.circle
                className="cls-1"
                cx="53.06"
                cy="28.03"
                r="25.03"
              />
            </motion.g>
          </motion.g>
        </motion.g>
      </motion.svg>
      <motion.p animate className={style.text}>
        User
      </motion.p>
    </motion.div>
  );
}
