import { motion } from 'framer-motion';
import * as React from 'react';
import { connect } from 'react-redux';
import { storeState } from '../../../interfaces/storeInterfaces';
import style from '../../../sass/icons.module.scss';
type UserProps = {
  stroke: string;
  className?: string;
  changeNav: (nav: string) => void;
  location?: string;
  currentNav?: string;
};

const UserElement = ({
  stroke,
  className,
  changeNav,
  currentNav,
  location,
}: UserProps) => {
  return (
    <div className={className} onClick={() => changeNav('user')}>
      <div className={currentNav === 'user' ? style.menuSelected : style.menu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 106.12 118.63"
          stroke={stroke}
          className={style.icon}
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <g
                id="User"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6px"
              >
                <path
                  className="cls-1"
                  d="M103.12,115.63V103.12a25,25,0,0,0-25-25H28a25,25,0,0,0-25,25v12.51"
                />
                <circle className="cls-1" cx="53.06" cy="28.03" r="25.03" />
              </g>
            </g>
          </g>
        </svg>
        <p className={style.text}>User</p>
      </div>
      {currentNav === 'user' && (
        <motion.div layoutId="border" className={style.border} />
      )}
    </div>
  );
};
const mapStateToProps = (state: storeState) => ({
  currentNav: state.path,
});

const User = connect(mapStateToProps)(UserElement);

export { User };
