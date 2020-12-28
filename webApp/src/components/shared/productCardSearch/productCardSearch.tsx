import React from 'react';
import styles from './productCardSearch.module.scss';
type props = {
  height?: string;
  width?: string;
  img: string;
  title: string;
  description: string;
};

const ProductCardSearch = ({
  height = '30vh',
  width = '100vw',
  img,
  title,
  description,
}: props) => {
  return (
    <div style={{ height, width }} className={styles.card}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={img} alt="" />
      </div>
      <div className={styles.detailsContainer}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export { ProductCardSearch };
