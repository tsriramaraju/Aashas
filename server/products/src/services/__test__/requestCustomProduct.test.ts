import { customRequestData } from '../../dummy Data/customProduct';
import { CustomProduct } from '../../models/CustomProducts';
import { requestCustomProduct } from '../requestCustomProduct';

describe('Request custom Product service test group', () => {
  it('should create custom product successfully', async () => {
    const res = await requestCustomProduct(customRequestData);

    const prod = await CustomProduct.findOne();

    expect(res.id).toBe(prod?.id);
    expect(res.version).toBe(prod?.version);
  });
});
