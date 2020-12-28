import React from 'react';
import styles from './productCardCurved.module.scss';
type props = {
  height?: string;
  width?: string;
  img: string;
  title: string;
  description: string;
  price: number;
};

const ProductCardCurved = ({
  height = '30vh',
  width = '100vw',
  img,
  title,
  description,
  price,
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
        <h3 className={styles.price}>{`Rs.${price}`}</h3>
      </div>
    </div>
  );
};

export { ProductCardCurved };
