import React from 'react';
import { Cart, Favourite, Logo } from '../../components/svg';
import styles from './mobileHeader.module.scss';
import { navigate as navigateAction } from '../../redux/actions/path';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';

type MobileHeaderProps = {
  navigateAction: (nav: string) => void;
};

const MobileHeaderElement = (props: MobileHeaderProps) => {
  const changNav = () => {
    props.navigateAction('');
    navigate(`/`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.stack}>
        <Logo className={styles.logo} onClick={changNav} />
        <div className={styles.icons}>
          <Favourite className={styles.favourite} />
          <Cart className={styles.cart} />
        </div>
      </div>
    </header>
  );
};

const MobileHeader = connect(null, { navigateAction })(MobileHeaderElement);

export { MobileHeader };
