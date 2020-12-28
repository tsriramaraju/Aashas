import React from 'react';
import { ProductCardCurved } from '../../components/shared';
import styles from './featuredProductsList.module.scss';

const FeaturedProductsList = () => {
  return (
    <div className={styles.container}>
      <ProductCardCurved
        description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
        title="Product title "
        img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
        price={15200}
        width="80%"
        height="100%"
      />
      <ProductCardCurved
        description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
        title="Product title "
        img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
        price={15200}
        width="80%"
        height="100%"
      />
      <ProductCardCurved
        description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
        title="Product title "
        img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
        price={15200}
        width="80%"
        height="100%"
      />
    </div>
  );
};

export { FeaturedProductsList };
