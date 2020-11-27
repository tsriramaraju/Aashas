import { DatabaseConnectionError } from '@aashas/common';
import { Product } from '../models/Products';

export const getProducts = async () => {
  try {
    return await Product.find().lean();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
