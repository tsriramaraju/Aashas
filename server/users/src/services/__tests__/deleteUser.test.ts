import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { deleteUser } from '../deleteUser';

describe('Delete user service test group', () => {
  it('should not delete if user has pending orders', async () => {
    await global.userLogin();
    const user = await User.findOne();
    user!.orders = [Types.ObjectId()];

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
});
