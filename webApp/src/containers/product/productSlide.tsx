import React from 'react';
import { Cart, Favourite } from '../../components/svg';
import style from './productSlide.module.scss';
type props = {
  back: () => void;
  cart?: () => void;
  favourite: () => void;
};
const ProductSlide = ({ back, favourite, cart }: props) => {
  return (
    <div className={style.box}>
      <div className={style.topIcons}>
        <svg
          className={style.backIcon}
          onClick={back}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <Cart className={style.cart} />
      </div>
      <div className={style.imgContainer}>
        <img
          className={style.img}
          src="https://images.unsplash.com/photo-1605763306721-21a4a72687ab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt=""
        />
        <img
          className={style.img}
          src="https://images.unsplash.com/photo-1605763306797-681e4e294849?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className={style.img}
          src="https://images.unsplash.com/photo-1605763307266-173ae9fefaef?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className={style.bottomIcons}>
        <Favourite className={style.favourite} />
      </div>
    </div>
  );
};

export default ProductSlide;
