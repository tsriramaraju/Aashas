import { Types } from 'mongoose';
import { Product } from '../../models/Products';
import { deleteProduct } from '../deleteProduct';

describe('Delete Product service test group', () => {
  it('should delete product successfully', async () => {
    const prod = await global.createProduct();
    const res = await deleteProduct(prod.id);
    expect(res!.id).toBe(prod.id);
    const post = await Product.findOne();
    expect(post).toBe(null);
  });

  it('should return null on deleting non existing product', async () => {
    const res = await deleteProduct(Types.ObjectId());
    expect(res).toBe(null);
    const post = await Product.findOne();
    expect(post).toBe(null);
  });
});
