import * as React from 'react';
import style from '../sass/index.module.scss';

import { Shop } from '../components/svg/icons/shop';
const IndexPage = () => {
  return (
    <main className={style.logo}>
      <Shop className={style.logo} />
    </main>
  );
};

export default IndexPage;
