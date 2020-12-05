import { DatabaseConnectionError, offer, productAttrs } from '@aashas/common';

import { Product } from '../models/Products';

export const updateProduct = async (
  prodId: string,
  productData: productAttrs | offer
) => {
  try {
    const product = await Product.findByIdAndUpdate(prodId, { ...productData });

    if (!product) return null;
    await product.save();
    return product;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
