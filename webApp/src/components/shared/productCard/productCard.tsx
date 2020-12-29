import { navigate } from 'gatsby';
import React from 'react';
import styles from './productCard.module.scss';
type props = {
  img: string;
  title: string;
  width?: string;
  fontSize?: string;
  height?: string;
  textColor?: 'primary' | 'secondary';
};

const ProductCard = ({
  img,
  title,
  height = '35vh',
  width = '45vw',
  textColor = 'primary',
  fontSize = '1.2em',
}: props) => {
  // TODO : change image later to gatsby images

  return (
    <div
      className={styles.productCard}
      style={{ height, width }}
      onClick={() => {
        navigate('/product');
      }}
    >
      <div className={styles.imgContainer}>
        <img className={styles.img} src={img} alt="image" />
      </div>
      <div className={styles.titleContainer}>
        <p
          className={styles.title}
          style={{
            color: textColor === 'primary' ? '#47556e' : '#eaa4a4',
            fontSize,
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export { ProductCard };
