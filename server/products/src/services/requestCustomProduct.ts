import {
  customProductRequestAttrs,
  DatabaseConnectionError,
} from '@aashas/common';
import { CustomProduct } from '../models/CustomProducts';

export const requestCustomProduct = async (
  reqData: customProductRequestAttrs
) => {
  try {
    const product = await CustomProduct.request(reqData).save();

    return product;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
