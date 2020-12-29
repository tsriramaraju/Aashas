import React from 'react';
import styles from '../sass/home.module.scss';
import { HomePattern } from '../components/svg/';
import { Button } from '../components/shared/';
import { ProductsList } from '../containers';
import { Banner } from '../components/shared/banner/Banner';

const IndexPage = () => {
  return (
    <section className={styles.home}>
      <HomePattern className={styles.pattern} />
      <h1 className={styles.heading}>Design your way of life</h1>
      <div style={{ height: '1.5vh' }} />
      <h4 className={styles.subHeading}>
        An occasion for every party in the town, just don't fit the dress, let
        the dress fit yousss
      </h4>
      <div style={{ height: '2.5vh' }} />
      <Button onclick={() => {}} width="50vw">
        Start Customization
      </Button>
      <div style={{ height: '5vh' }} />
      <ProductsList />
      <div style={{ height: '5vh' }} />
      <Banner />
      <div style={{ height: '10vh' }} />
    </section>
  );
};

export default IndexPage;
