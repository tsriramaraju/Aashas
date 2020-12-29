import React from 'react';
import style from './searchBox.module.scss';
import { motion } from 'framer-motion';
// import SearchIcon from '../../components/search/searchIcon';
// import { ProductCardSearch } from '../../components/shared/productCardSearch/productCardSearch';
type props = {
  onClick: () => void;
};
const SearchBox = ({ onClick }: props) => {
  return (
    <motion.div className={style.box} layoutId="searchBox">
      <div className={style.searchBox}>
        <svg
          className={style.backIcon}
          onClick={onClick}
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

        <input className={style.input} type="text" placeholder="Search" />
        <motion.svg
          className={style.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          layoutId="searchIcon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </motion.svg>
      </div>
      <div className={style.resultBox}>
        {/* <ProductCardSearch
          description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
          title="Product title"
          img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          height="30%"
          width="100%"
        /> */}
        {/* <ProductCardSearch
          description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
          title="Product title"
          img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          height="30%"
          width="100%"
        />
        <ProductCardSearch
          description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
          title="Product title"
          img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          height="30%"
          width="100%"
        />
        <ProductCardSearch
          description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
          title="Product title"
          img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          height="30%"
          width="100%"
        />
        <ProductCardSearch
          description="Featuring a midnight blue eplum top with a turquoise dhoti pant. The peplum top is embellished with rich zardosi embroidery of sequins and dabka"
          title="Product title"
          img="https://images.unsplash.com/flagged/photo-1580141043903-ef7df571364b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          height="30%"
          width="100%"
        /> */}
      </div>
    </motion.div>
  );
};

export default SearchBox;
