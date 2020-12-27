import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Layout } from './src/layout';
import { AnimateSharedLayout } from 'framer-motion';

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <AnimateSharedLayout>
        <Layout>{element}</Layout>
      </AnimateSharedLayout>
    </Provider>
  );
};
