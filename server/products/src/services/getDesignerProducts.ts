import { DatabaseConnectionError } from '@aashas/common';
import { Product } from '../models/Products';

export const getDesignerProducts = async () => {
  try {
    return await Product.find({ designerCollection: true }).lean();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
