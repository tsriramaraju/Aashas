import { CategoryOffer, DatabaseConnectionError } from '@aashas/common';
import { Product } from '../models/Products';

export const updateCategoryOffer = async (category: CategoryOffer) => {
  try {
    const products = await Product.find({ outfit: category.outfit });
    if (products.length === 0) return null;

    const promises = products.map(async (product) => {
      product.inOffer = category.inOffer;
      product.discount = category.discount;

      await product.save();
    });
    await Promise.all(promises);

    return products;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
