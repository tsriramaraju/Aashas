import React from 'react';
import styles from './banner.module.scss';

import image from '../../../assets/images/banner1.jpg';
//  TODO : remove image later
type props = {
  height?: string;
  width?: string;
  images?: string[];
};

const Banner = ({
  height = '30vh',
  width = '100vw',
  images = [
    image,
    'https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    image,
  ],
}: props) => {
  return (
    <div style={{ height, width }} className={styles.banner}>
      {images.map((image) => (
        <img key={Math.random()} src={image} className={styles.image} />
      ))}
    </div>
  );
};

export { Banner };
