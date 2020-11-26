import { Types } from 'mongoose';
import { Product } from '../models/Products';

export const deleteProduct = async (id: Types.ObjectId) => {
  try {
    const product = await Product.findById(id);
    if (!product) return false;
    await product.remove();

    return true;
  } catch (error) {}
};
