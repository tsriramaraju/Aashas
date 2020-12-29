import { navigate } from 'gatsby';
import React from 'react';
import { Banner, Button } from '../../../components/shared';
import CustomPattern from '../../../components/svg/patterns/custom';
import style from './customMain.module.scss';

const CustomMain = () => {
  return (
    <section className={style.custom}>
      <Banner />
      <h2 className={style.heading}>Benefits</h2>
      <h4 className={style.benefits}>Perfect fit</h4>
      <h4 className={style.benefits}>Highly customizable</h4>
      <h4 className={style.benefits}>Great details</h4>
      <p className={style.text}>
        Lorem ipsum dolor sit amet, et mei ipsum molestie, cu illud minim
        commune eam. Quo case signiferumque eu. Ne everti moderatius ius, etiam
        assum ea quo. At eum wisi iracundia, probo blandit ut vis, habeo oluta
        tincidunt id cum. Qui no ipsum volutpat, meis epicuri ex mel. Eam
        nostrud urbanitas at. Ne dicta nullam salutatus eum, ne dolores fabellas
        nec.
      </p>
      <Button
        onclick={() => {
          navigate('/custom/steps');
        }}
        radius="10px"
        fontSize="1.25em"
      >
        Start Customization
      </Button>
      <CustomPattern className={style.svg} />
    </section>
  );
};

export default CustomMain;
