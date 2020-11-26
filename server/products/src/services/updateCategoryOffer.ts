import {
  categories,
  CategoryOffer,
  DatabaseConnectionError,
  outfit,
} from '@aashas/common';
import { Product } from '../models/Products';

export const updateCategoryOffer = async (category: CategoryOffer) => {
  try {
    //  TODO : change category later

    const filter: outfit = {
      type: categories.men,
      occasion: {},
    };

    const products = await Product.find({ outfit: filter });

    if (products.length === 0) return false;

    products.map(async (product) => {
      (product.inOffer = category.inOffer),
        (product.discount = category.discount);
      await product.save();
    });

    return true;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
