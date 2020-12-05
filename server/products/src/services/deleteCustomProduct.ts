import { CustomProduct } from '../models/CustomProducts';

export const deleteCustomProduct = async (id: string) => {
  try {
    const product = await CustomProduct.findById(id);
    if (!product) return null;
    await product.remove();

    return product;
  } catch (error) {}
};
