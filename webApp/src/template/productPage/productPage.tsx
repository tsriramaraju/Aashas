import React from 'react';
import { Button } from '../../components/shared';
import ProductDetails from '../../containers/product/productDetails';
import ProductSlide from '../../containers/product/productSlide';

import styles from './productPage.module.scss';

const ProductPage = () => {
  return (
    <div className={styles.page}>
      <ProductSlide back={() => {}} favourite={() => {}} />
      <ProductDetails />
      <div className={styles.button}>
        <Button onclick={() => {}} radius="10px" fontSize="1.25em">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
