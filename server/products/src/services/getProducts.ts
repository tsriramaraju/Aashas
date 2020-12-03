import { DatabaseConnectionError } from '@aashas/common';
import { Product } from '../models/Products';

export const getProducts = async (filter?: {
  designerCollection?: boolean;
  inOffer?: boolean;
  trending?: boolean;
}) => {
  try {
    return await Product.find(filter === undefined ? {} : filter).lean();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
