import React, { useState } from 'react';
import { Custom, Home, Icon, Shop, User } from '../../components/svg';

import styles from './mobileNav.module.scss';
import { AnimateSharedLayout } from 'framer-motion';
const MobileNav = () => {
  const [nav, setNav] = useState('home');

  const changNav = (nav: string) => {
    setNav(nav);
  };

  return (
    <AnimateSharedLayout>
      <section className={styles.nav}>
        <Home
          className={nav === 'home' ? styles.selected : styles.item}
          changeNav={changNav}
        />
        <Shop
          className={nav === 'shop' ? styles.selected : styles.item}
          changeNav={changNav}
        />
        <Custom
          className={nav === 'custom' ? styles.selected : styles.item}
          changeNav={changNav}
        />
        <Icon
          className={nav === 'aashas' ? styles.selected : styles.item}
          changeNav={changNav}
        />
        <User
          stroke="#47556E"
          className={nav === 'user' ? styles.selected : styles.item}
          changeNav={changNav}
        />
      </section>
    </AnimateSharedLayout>
  );
};

export { MobileNav };
