import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { addCart } from '../addCart';

describe('Add Cart items service test group', () => {
  it('should add item successfully if item is not present in users data', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.cart?.length).toBe(0);

    const status = await addCart({
      prodId: Types.ObjectId().toString(),
      userId: user?._id,
    });
    await addCart({
      prodId: Types.ObjectId().toString(),
      userId: user?._id,
    });

    expect(status).toBe('Cart items added successfully');
    const user1 = await User.findOne().lean();

    expect(user1?.cart?.length).toBe(2);
    expect(user1?.version).toBe(2);
  });

  it('should not add duplicate entry if item  already exists', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.cart?.length).toBe(0);

    const id = Types.ObjectId().toString();
    const status = await addCart({ prodId: id, userId: user?._id });
    const status1 = await addCart({ prodId: id, userId: user?._id });
    await addCart({ prodId: id, userId: user?._id });
    await addCart({ prodId: id, userId: user?._id });
    await addCart({ prodId: id, userId: user?._id });

    expect(status).toBe('Cart items added successfully');
    expect(status1).toBe('Cart items added successfully');
    const user1 = await User.findOne().lean();
    expect(user1?.version).toBe(1);
    expect(user1?.cart?.length).toBe(1);
  });
});
