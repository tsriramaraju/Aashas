import React from 'react';
import style from './customProgress.module.scss';
const CustomProgress = () => {
  return (
    <div className={style.progress}>
      <div className={style.progressCircles}>
        <div className={style.outerCircle}>
          <div className={style.innerCircle} />
        </div>
        <div className={style.outerLine}>
          <div className={style.innerLine} />
        </div>
        <div className={style.outerCircleDisabled}>
          <div className={style.innerCircleDisabled} />
        </div>
        <div className={style.outerLineDisabled}>
          <div className={style.innerLineDisabled} />
        </div>
        <div className={style.outerCircleDisabled}>
          <div className={style.innerCircleDisabled} />
        </div>
      </div>
      <div className={style.progressInfo}>
        <div className={style.textContainer}>
          <p className={style.text1}>Step 1</p>
          <p className={style.text2}>Outfit</p>
          <p className={style.text3}>In Progress</p>
        </div>
        <div className={style.textContainer}>
          <p className={style.text1}>Step 2</p>
          <p className={style.text2Disabled}>Reference Images</p>
          <p className={style.text3Disabled}>Pending</p>
        </div>
        <div className={style.textContainer}>
          <p className={style.text1}>Step 3</p>
          <p className={style.text2Disabled}>Submit</p>
          <p className={style.text3Disabled}>Pending</p>
        </div>
      </div>
    </div>
  );
};

export default CustomProgress;
