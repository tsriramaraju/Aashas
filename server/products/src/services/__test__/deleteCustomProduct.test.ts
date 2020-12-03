import { Types } from 'mongoose';
import { CustomProduct } from '../../models/CustomProducts';
import { deleteCustomProduct } from '../deleteCustomProduct';

describe('Delete Custom Product service test group', () => {
  it('should delete product successfully', async () => {
    const prod = await global.createCustomProduct(Types.ObjectId());
    const res = await deleteCustomProduct(prod.id);
    expect(res!.id).toBe(prod.id);
    const post = await CustomProduct.findOne();
    expect(post).toBe(null);
  });

  it('should return null on deleting non existing product', async () => {
    const res = await deleteCustomProduct(Types.ObjectId());
    expect(res).toBe(null);
    const post = await CustomProduct.findOne();
    expect(post).toBe(null);
  });
});
