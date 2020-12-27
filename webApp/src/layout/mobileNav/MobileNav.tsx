import React, { useState } from 'react';
import { Custom, Home, Icon, Shop, User } from '../../components/svg';
import styles from './mobileNav.module.scss';
import { AnimateSharedLayout, motion } from 'framer-motion';

const MobileNav = () => {
  const [nav, setNav] = useState('home');

  const changNav = (nav: string) => {
    setNav(nav);
  };

  return (
    <AnimateSharedLayout>
      <motion.div animate className={styles.nav}>
        <Home
          className={nav === 'home' ? styles.selected : styles.item}
          changeNav={changNav}
          location={nav}
        />
        <Shop
          className={nav === 'shop' ? styles.selected : styles.item}
          changeNav={changNav}
          location={nav}
        />
        <Custom
          className={nav === 'custom' ? styles.selected : styles.item}
          changeNav={changNav}
          location={nav}
        />
        <Icon
          className={nav === 'aashas' ? styles.selected : styles.item}
          changeNav={changNav}
          location={nav}
        />
        <User
          stroke="#47556E"
          className={nav === 'user' ? styles.selected : styles.item}
          changeNav={changNav}
          location={nav}
        />
      </motion.div>
    </AnimateSharedLayout>
  );
};

export { MobileNav };
