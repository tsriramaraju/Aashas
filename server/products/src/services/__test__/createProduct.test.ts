import { maleProductData } from '../../dummy Data/Product';
import { Product } from '../../models/Products';
import { createProduct } from '../createProduct';

describe('Create Product service test group', () => {
  it('should create product successfully', async () => {
    const res = await createProduct(maleProductData);

    const prod = await Product.findOne();

    expect(res.id).toBe(prod?.id);
    expect(res.version).toBe(prod?.version);
  });
});
