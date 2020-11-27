import { DatabaseConnectionError, productAttrs } from '@aashas/common';
import { Product } from '../models/Products';

export const createProduct = async (product: productAttrs) => {
  try {
    const productDoc = await Product.build(product).save();

    return productDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
