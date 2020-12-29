import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Layout } from './src/layout';

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <Layout>{element}</Layout>
    </Provider>
  );
};
