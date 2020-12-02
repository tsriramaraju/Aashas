import { Types } from 'mongoose';
import { getOrders } from '../getOrders';

describe('Get order service test group', () => {
  it('should return list of all orders', async () => {
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());
    await global.createOrder(Types.ObjectId());

    const res = await getOrders();
    expect(res.length).toBe(4);
  });

  it('should return empty array if no orders found', async () => {
    const res = await getOrders();
    expect(res.length).toBe(0);
  });
});
