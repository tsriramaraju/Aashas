import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { deleteUser } from '../deleteUser';

describe('Delete user service test group', () => {
  it('should not delete if user has pending orders', async () => {
    await global.userLogin();
    const user = await User.findOne();
    const order = await global.createOrder(user!.id);
    const order1 = await global.createOrder(user!.id);
    order1.deliveryDate = Date.now().toString();
    await order1.save();
    user!.orders = [order.id, order1.id];

    await user!.save();

    const res = await deleteUser(user?._id);

    expect(res).toBe(false);
  });

  it('should delete successfully if there are no pending orders', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();

    const res = await deleteUser(user?._id);

    expect(res).toBe(true);
  });
  it('should delete successfully if there are no pending orders', async () => {
    const res = await deleteUser(Types.ObjectId());

    expect(res).toBe(null);
  });
});
