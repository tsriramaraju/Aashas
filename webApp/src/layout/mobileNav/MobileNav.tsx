import React, { useEffect, useState } from 'react';
import { Custom, Home, Icon, Shop, User } from '../../components/svg';
import styles from './mobileNav.module.scss';
import { motion } from 'framer-motion';
import { storeState } from '../../interfaces/storeInterfaces';
import { connect } from 'react-redux';
import { navigate as navigateAction } from '../../redux/actions/path';
import { navigate } from 'gatsby';

type MobileNavProps = {
  currentNav: string;
  navigateAction: (nav: string) => void;
};

const MobileNavElement = (props: MobileNavProps) => {
  const [nav, setNav] = useState('home');

  useEffect(() => {
    setNav(props.currentNav);
  }, []);

  const changNav = (nav: string) => {
    setNav(nav);
    if (nav === 'home') {
      props.navigateAction('');
      navigate(`/`);
    } else {
      props.navigateAction(nav);
      navigate(`/${nav}`);
    }
  };

  return (
    <motion.div animate className={styles.nav}>
      <Home
        className={nav === '' ? styles.selected : styles.item}
        changeNav={changNav}
        // location={nav}
      />
      <Shop
        className={nav === 'shop' ? styles.selected : styles.item}
        changeNav={changNav}
        // location={nav}
      />
      <Custom
        className={nav === 'custom' ? styles.selected : styles.item}
        changeNav={changNav}
        // location={nav}
      />
      <Icon
        className={nav === 'aashas' ? styles.selected : styles.item}
        changeNav={changNav}
        // location={nav}
      />
      <User
        stroke="#47556E"
        className={nav === 'user' ? styles.selected : styles.item}
        changeNav={changNav}
        // location={nav}
      />
    </motion.div>
  );
};

const mapStateToProps = (state: storeState) => ({
  currentNav: state.path,
});

const MobileNav = connect(mapStateToProps, { navigateAction })(
  MobileNavElement
);

export { MobileNav };
