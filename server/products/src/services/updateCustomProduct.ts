import { customProductsAttrs, DatabaseConnectionError } from '@aashas/common';
import { CustomProduct } from '../models/CustomProducts';

export const updateCustomProduct = async (
  prodId: string,
  productData: customProductsAttrs
) => {
  try {
    const product = await CustomProduct.findByIdAndUpdate(prodId, {
      ...productData,
    });

    if (!product) return null;
    await product.save();
    return product;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
