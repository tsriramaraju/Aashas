import React from 'react';
import ProductDetails from '../../containers/product/productDetails';
import ProductSlide from '../../containers/product/productSlide';

import styles from './productPage.module.scss';

const ProductPage = () => {
  return (
    <div className={styles.page}>
      <ProductSlide back={() => {}} favourite={() => {}} />
      <ProductDetails />
    </div>
  );
};

export default ProductPage;
