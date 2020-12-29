import React, { useState } from 'react';
import style from './productDetailsTop.module.scss';
const ProductDetailsTop = () => {
  const [size, setsize] = useState('');
  return (
    <div className={style.productDetailsTop}>
      <h2 className={style.productTitle}>Product Title</h2>
      <h4 className={style.productPrice}>₹12,500.00</h4>

      <h5 className={style.sizeTitle}>Your Size</h5>
      <div className={style.sizesBox}>
        <h4
          className={size === 'S' ? style.sizeSelected : style.size}
          onClick={(e) => {
            setsize('S');
          }}
        >
          S
        </h4>
        <h4
          className={size === 'M' ? style.sizeSelected : style.size}
          onClick={(e) => {
            setsize('M');
          }}
        >
          M
        </h4>
        <h4
          className={size === 'L' ? style.sizeSelected : style.size}
          onClick={(e) => {
            setsize('L');
          }}
        >
          L
        </h4>
        <h4
          className={size === 'XL' ? style.sizeSelected : style.size}
          onClick={(e) => {
            setsize('XL');
          }}
        >
          XL
        </h4>
      </div>
    </div>
  );
};

export default ProductDetailsTop;
