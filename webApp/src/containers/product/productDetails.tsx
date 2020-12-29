import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Chips } from '../../components/shared';
import style from './productDetails.module.scss';
import ProductDetailsBottom from './productDetailsBottom';
import ProductDetailsTop from './productDetailsTop';

const ProductDetails = () => {
  return (
    <motion.div
      drag="y"
      dragConstraints={{ bottom: 0, top: -450 }}
      dragElastic={0.2}
      className={style.drag}
    >
      <div className={style.line} />
      <ProductDetailsTop />
      <ProductDetailsBottom />
    </motion.div>
  );
};

export default ProductDetails;
