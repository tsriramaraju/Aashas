import React from 'react';
import { Button } from '../../components/shared';
import ProductDetails from '../../containers/product/productDetails';
import ProductSlide from '../../containers/product/productSlide';
import { navigate } from 'gatsby';
import styles from './productPage.module.scss';
import { storeState } from '../../interfaces/storeInterfaces';
import { connect } from 'react-redux';

type Props = {
  currentNav: string;
};

const ProductPageElement = ({ currentNav }: Props) => {
  const goBack = () => {
    console.log(currentNav);
    if (currentNav === 'home') {
      navigate(`/`);
    } else {
      navigate(`/${currentNav}`);
    }
  };

  return (
    <div className={styles.page}>
      <ProductSlide back={goBack} favourite={() => {}} />
      <ProductDetails />
      <div className={styles.button}>
        <Button onclick={() => {}} radius="10px" fontSize="1.25em">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: storeState) => ({
  currentNav: state.path,
});

const ProductPage = connect(mapStateToProps)(ProductPageElement);

export default ProductPage;
