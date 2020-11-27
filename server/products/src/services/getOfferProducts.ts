import { DatabaseConnectionError } from '@aashas/common';
import { Product } from '../models/Products';

export const getOfferProducts = async () => {
  try {
    return await Product.find({ inOffer: true }).lean();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
