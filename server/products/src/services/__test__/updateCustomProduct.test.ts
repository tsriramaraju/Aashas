import { Types } from 'mongoose';
import { customBuildData } from '../../dummy Data/customProduct';
import { CustomProduct } from '../../models/CustomProducts';
import { updateCustomProduct } from '../updateCustomProduct';

describe('Update Custom Product service test group', () => {
  it('should update product successfully', async () => {
    const prod = await global.createCustomProduct(Types.ObjectId());

    await updateCustomProduct(prod.id, { ...customBuildData, title: 'hello' });
    const res = await CustomProduct.findOne();
    expect(prod.version + 1).toBe(res!.version);
    expect(res!.title).toBe('hello');
  });

  it('should return null if no product is found', async () => {
    const res = await updateCustomProduct(Types.ObjectId(), {
      ...customBuildData,
    });

    expect(res).toBe(null);
  });
});
