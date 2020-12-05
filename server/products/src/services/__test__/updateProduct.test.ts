import { Types } from 'mongoose';
import { maleProductData } from '../../dummy Data/Product';
import { Product } from '../../models/Products';
import { updateProduct } from '../updateProduct';

describe('Update Product service test group', () => {
  it('should update product successfully', async () => {
    const prod = await global.createProduct();

    await updateProduct(prod.id, { ...maleProductData, title: 'hello' });
    const res = await Product.findOne();
    expect(prod.version + 1).toBe(res!.version);
    expect(res!.title).toBe('hello');
  });

  it('should return null if no product is found', async () => {
    const res = await updateProduct(Types.ObjectId().toHexString(), {
      ...maleProductData,
      title: 'hello',
    });

    expect(res).toBe(null);
  });
});
