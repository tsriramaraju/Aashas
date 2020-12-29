import React from 'react';
import StepOne from '../../containers/custom/step1/step1';
import StepTwo from '../../containers/custom/step2/step2';
import styles from '../../sass/custom.module.scss';
const Steps = () => {
  return (
    <div className={styles.steps}>
      <div style={{ height: '7vh' }} />
      <StepTwo />
    </div>
  );
};

export default Steps;
