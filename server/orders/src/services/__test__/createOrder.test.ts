import { Types } from 'mongoose';
import { orderData } from '../../dummy data/orders';
import { Order } from '../../models/Orders';
import { createOrder } from '../createOrder';

describe('Create order service test group', () => {
  it('should Create order successfully', async () => {
    const res = await createOrder(orderData);
    const order = await Order.findOne();
    expect(res.id).toBe(order!.id);
  });
});
