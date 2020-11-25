import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { getOrder } from '../getOrders';

describe('Get orders service test group', () => {
  it('should get list of all the orders', async () => {
    await global.userLogin();
    const user = await User.findOne();
    // user!.orders = [
    //   Types.ObjectId(),
    //   Types.ObjectId(),
    //   Types.ObjectId(),
    //   Types.ObjectId(),
    // ];

    await global.createOrder(user!.id);
    await global.createOrder(user!.id);
    await global.createOrder(user!.id);
    await global.createOrder(user!.id);

    // await user!.save();

    const res = await getOrder(user!.id);

    console.log(res);

    // expect(res!.orders!.length).toBe(4);
    //  FIXME : orders populate
  });

  it('should return empty array if no orders found', async () => {
    await global.userLogin();
    const user = await User.findOne();

    const res = await getOrder(user!.id);

    expect(res!.orders!.length).toBe(0);
  });
});
