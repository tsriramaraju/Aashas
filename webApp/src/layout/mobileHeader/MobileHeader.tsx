import React from 'react';
import { Cart, Favourite, Logo } from '../../components/svg';
import styles from './mobileHeader.module.scss';
const MobileHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.stack}>
        <Logo className={styles.logo} />
        <div className={styles.icons}>
          <Favourite className={styles.favourite} />
          <Cart className={styles.cart} />
        </div>
      </div>
    </header>
  );
};

export { MobileHeader };
