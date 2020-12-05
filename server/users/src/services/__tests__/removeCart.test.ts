import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { addCart } from '../addCart';
import { removeCart } from '../removeCart';

describe('Remove  Cart service test group', () => {
  it('should remove all cart items if no product id is mentioned', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();

    await addCart({ prodId: Types.ObjectId().toString(), userId: user?._id });
    await addCart({ prodId: Types.ObjectId().toString(), userId: user?._id });

    await removeCart({ userId: user?._id });
    const user1 = await User.findOne().lean();
    expect(user1?.cart?.length).toBe(undefined);
    expect(user1?.version).toBe(3);
  });
  it('should remove specific product  if  product id is mentioned', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    const id = Types.ObjectId().toString();
    await addCart({ prodId: id, userId: user?._id });
    await addCart({ prodId: Types.ObjectId().toString(), userId: user?._id });

    await removeCart({ userId: user?._id, prodId: id });
    const user1 = await User.findOne().lean();
    expect(user1?.cart?.length).toBe(1);
    expect(user1?.version).toBe(3);
  });
});
