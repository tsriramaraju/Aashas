import React, { useEffect } from 'react';
import { Custom, Home, Icon, Shop, User } from '../../components/svg';
import styles from './mobileNav.module.scss';

import { storeState } from '../../interfaces/storeInterfaces';
import { connect } from 'react-redux';
import { navigate as navigateAction } from '../../redux/actions/path';
import { navigate } from 'gatsby';

type MobileNavProps = {
  currentNav: string;
  navigateAction: (nav: string) => void;
};

const MobileNavElement = (props: MobileNavProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      props.navigateAction(window.location.pathname.substring(1));
      navigate(window.location.pathname);
    }
  }, []);

  const changNav = (nav: string) => {
    if (nav === 'home') {
      props.navigateAction('');
      navigate(`/`);
    } else {
      props.navigateAction(nav);
      navigate(`/${nav}`);
    }
  };

  return (
    <div className={styles.nav}>
      <Home
        className={props.currentNav === '' ? styles.selected : styles.item}
        changeNav={changNav}
      />
      <Shop
        className={props.currentNav === 'shop' ? styles.selected : styles.item}
        changeNav={changNav}
      />
      <Custom
        className={
          props.currentNav === 'custom' ? styles.selected : styles.item
        }
        changeNav={changNav}
      />
      <Icon
        className={
          props.currentNav === 'aashas' ? styles.selected : styles.item
        }
        changeNav={changNav}
      />
      <User
        stroke="#47556E"
        className={props.currentNav === 'user' ? styles.selected : styles.item}
        changeNav={changNav}
      />
    </div>
  );
};

const mapStateToProps = (state: storeState) => ({
  currentNav: state.path,
});

const MobileNav = connect(mapStateToProps, { navigateAction })(
  MobileNavElement
);

export { MobileNav };
