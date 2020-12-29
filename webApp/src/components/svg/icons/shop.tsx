import * as React from 'react';
import style from '../../../sass/icons.module.scss';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { storeState } from '../../../interfaces/storeInterfaces';
type ShopProps = {
  className?: string;
  changeNav: (nav: string) => void;
  location?: string;
  currentNav?: string;
};

const ShopElement = (props: ShopProps) => {
  return (
    <div {...props} onClick={() => props.changeNav('shop')}>
      <div
        className={
          props.currentNav === 'shop' ? style.menuSelected : style.menu
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 138.54 136.51"
          className={style.icon}
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="shop">
              <path
                id="dress"
                d="M69.26,17.4c9.14,0,15.63-7.08,16.22-16.81-.59,0-1.47-.3-2.06,0-2.36.29-4.72,1.47-7.08,2.06C68.67,4.72,61,.59,53.34,0,53.93,9.73,61,17.4,69.26,17.4ZM124.1,39.8C115,27.42,105.53,14.74,93.44,4.72a9.13,9.13,0,0,0-2.06-1.48C89.9,15,81.06,23.59,69.26,23.59c-11.5,0-20.93-10.32-22.11-23.3-9.14,2.36-15,11.8-20,20.35A284.78,284.78,0,0,1,4.4,51.3C2,54.25-.91,57.5.27,61,1.45,65.72,7.93,66.9,13,66.61c1.77,0,3.54,0,5-1.18a7.55,7.55,0,0,0,2.36-3.54l7.07-15C28.56,44.24,30,41.29,33,40.4s6.19.89,7.66,3.54c1.77,2.66,2.07,5.6,2.36,8.55a128.58,128.58,0,0,1-16.8,74.3c-.89,1.48-1.77,3.25-1.48,5,.59,3.54,5.31,4.42,8.85,4.42,6.19,0,12.67,0,18.87.29a52.88,52.88,0,0,0,6.78-.29,53.06,53.06,0,0,0,7.37-1.77c13.86-2.95,28.6,1.48,42.16-2.36a26.41,26.41,0,0,1-11.5-11.2c-4.12-8.55-3.53-18.58-2.36-27.72.89-13.56,2.36-27.71,3.84-41.87.29-2.65,1.18-5.89,3.54-6.48,1.47-.3,2.65.29,4.12,1.18a36.28,36.28,0,0,1,16.52,21.82,53,53,0,0,1,15.62-8.26C133.83,52.78,129.12,46.29,124.1,39.8Z"
              />
            </g>
          </g>
        </svg>
        <p className={style.text}>shop</p>
      </div>
      {props.currentNav === 'shop' && (
        <motion.div layoutId="border" className={style.border} />
      )}
    </div>
  );
};

const mapStateToProps = (state: storeState) => ({
  currentNav: state.path,
});

const Shop = connect(mapStateToProps)(ShopElement);

export { Shop };
