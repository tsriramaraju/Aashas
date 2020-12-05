import { Product } from '../models/Products';

export const deleteProduct = async (id: string) => {
  try {
    const product = await Product.findById(id);
    if (!product) return null;
    await product.remove();

    return product;
  } catch (error) {}
};
