import { DatabaseConnectionError } from '@aashas/common';
import { Product } from '../models/Products';

export const getTrends = async () => {
  try {
    return await Product.find({ trending: true }).lean();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
