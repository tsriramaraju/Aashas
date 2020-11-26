import { DatabaseConnectionError, productAttrs } from '@aashas/common';
import { Product } from '../models/Products';

export const createProduct = async (product: productAttrs<any>) => {
  try {
    const productDoc = await Product.build(product).save();
    //  TODO : publish events
    return productDoc;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
