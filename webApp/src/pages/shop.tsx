import React, { useState } from 'react';
import SearchIcon from '../components/search/searchIcon';
import { FeaturedProductsList, ProductsListShop } from '../containers';
import Filter from '../containers/shop/filter';
import styles from '../sass/shop.module.scss';
import { AnimateSharedLayout, motion } from 'framer-motion';
import SearchBox from '../containers/searchBox/searchBox';

const ShopPage = () => {
  const [search, setSearch] = useState(false);

  const toggleSearch = () => {
    setSearch(!search);
  };

  return (
    <AnimateSharedLayout>
      <div style={{ height: '7vh' }} />
      <section className={styles.shop}>
        {search ? (
          <SearchBox onClick={toggleSearch} />
        ) : (
          <>
            <FeaturedProductsList />
            <Filter />
            <ProductsListShop />
            <SearchIcon onClick={toggleSearch} />
          </>
        )}
        <div style={{ height: '10vh' }} />
      </section>
    </AnimateSharedLayout>
  );
};

export default ShopPage;
