import React from 'react';
import CustomProgress from '../../../components/shared/progress/customProgress';
import style from './step3.module.scss';

const StepThree = () => {
  return (
    <div className={style.step1}>
      <CustomProgress />
      <div className={style.stepsContainer}>
        <div className={style.category}>
          <h2 className={style.mainTitle}>Pick Category</h2>
          <div className={style.firstRow}>
            <h4 className={style.pick}>Women</h4>
            <h4 className={style.pick}>Men</h4>
          </div>
          <div className={style.secondRow}>
            <h4 className={style.pick}>Kids</h4>
          </div>
        </div>
        <div className={style.occasion}>
          <h3 className={style.secondaryTitle}>Occasion</h3>
        </div>
        <div className={style.type}>
          <h3 className={style.secondaryTitle}>Type</h3>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
