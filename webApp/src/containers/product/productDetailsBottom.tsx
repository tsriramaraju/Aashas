import React, { useState } from 'react';
import { Chips } from '../../components/shared';

import style from './productDetailsBottom.module.scss';

const ProductDetailsBottom = () => {
  const [details, setDetails] = useState('details');

  const detail = (
    <div className={style.box}>
      <h3 className={style.heading}>Composition</h3>
      <p className={style.text}>100% pure cotton</p>
      <div style={{ height: '10px' }} />
      <h3 className={style.heading}>Care</h3>
      <p className={style.text}>
        Lorem ipsum dolor sit amet, et mei ipsum molestie, cu illud minim
        commune eam. Quo case signiferumque eu. Ne everti moderatius ius, etiam
        assum ea quo. At eum wisi iracundia, probo blandit ut vis, habeo soluta
        tincidunt id cum. Qui no ipsum volutpat, meis epicuri ex mel. Eam
        nostrud urbanitas at. Ne dicta nullam salutatus eum, ne dolores fabellas
        nec.
      </p>
    </div>
  );
  const order = (
    <div className={style.box}>
      <h3 className={style.heading}>Estimated shipping days</h3>
      <p className={style.text}>100% pure cotton</p>
      <div style={{ height: '10px' }} />
      <h3 className={style.heading}>Instructions</h3>
      <p className={style.text}>
        Lorem ipsum dolor sit amet, et mei ipsum molestie, cu illud minim
        commune eam. Quo case signiferumque eu. Ne everti moderatius ius, etiam
        assum ea quo. At eum wisi iracundia, probo blandit ut vis, habeo soluta
        tincidunt id cum. Qui no ipsum volutpat, meis epicuri ex mel. Eam
        nostrud urbanitas at. Ne dicta nullam salutatus eum, ne dolores fabellas
        nec.
      </p>
    </div>
  );
  const payment = (
    <div className={style.box}>
      <h3 className={style.heading}>Terms & Conditions</h3>
      <p className={style.text}>
        Lorem ipsum dolor sit amet, et mei ipsum molestie, cu illud minim
        commune eam. Quo case signiferumque eu. Ne everti moderatius ius, etiam
        assum ea quo. At eum wisi iracundia, probo blandit ut vis, habeo soluta
        tincidunt id cum. Qui no ipsum volutpat, meis epicuri ex mel. Eam
        nostrud urbanitas at. Ne dicta nullam salutatus eum, ne dolores fabellas
        nec. Cu illum inimicus mel. Ius elit eligendi vituperata ut.soluta
        tincidunt id cum. Qui no ipsum volutpat, meis epicuri ex mel. Eam
        nostrud urbanitas at. Ne dicta nullam salutatus eum, ne dolores fabellas
        nec. Cu illum inimicus mel. Ius elit eligendi vituperata ut.
      </p>
    </div>
  );

  return (
    <div className={style.productDetailsBottomCard}>
      <div className={style.chips}>
        <Chips
          onClick={() => {
            setDetails('details');
          }}
          text="Details"
          selected={details === 'details'}
        />
        <Chips
          onClick={() => {
            setDetails('order');
          }}
          text="Order"
          selected={details === 'order'}
        />
        <Chips
          onClick={() => {
            setDetails('payment');
          }}
          text="Payment"
          selected={details === 'payment'}
        />
      </div>
      {details === 'details' ? detail : details === 'order' ? order : payment}
    </div>
  );
};

export default ProductDetailsBottom;
