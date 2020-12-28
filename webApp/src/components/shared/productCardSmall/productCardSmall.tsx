import React from 'react';
import styles from './productCardSmall.module.scss';
type props = {
  img: string;
  title: string;
};

const ProductCardSmall = ({ img, title }: props) => {
  // TODO : change image later to gatsby images
  return (
    <div className={styles.productCard}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={img} alt="image" />
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
};

export { ProductCardSmall };
