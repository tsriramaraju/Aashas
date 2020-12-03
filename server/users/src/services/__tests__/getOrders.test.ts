import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { getOrder } from '../getOrders';

describe('Get orders service test group', () => {
  it('should get list of all the orders', async () => {
    await global.userLogin();
    const user = await User.findOne();

    const order = await global.createOrder(user!.id);
    const order1 = await global.createOrder(user!.id);
    const order2 = await global.createOrder(user!.id);
    const order3 = await global.createOrder(user!.id);
    user!.orders = [order1.id, order.id, order2.id, order3.id];

    await user!.save();

    const res = await getOrder(user!.id);

    expect(res!.orders!.length).toBe(4);
  });

  it('should return empty array if no orders found', async () => {
    await global.userLogin();
    const user = await User.findOne();

    const res = await getOrder(user!.id);

    expect(res!.orders!.length).toBe(0);
  });
});
