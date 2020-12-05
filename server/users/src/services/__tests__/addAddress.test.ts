import { Types } from 'mongoose';
import { addressData } from '../../dummy data/user';
import { User } from '../../models/Users';
import { addAddress } from '../addAddress';

describe('Add address Service test group', () => {
  it('should add address to user if valid address is given', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.addresses?.length).toBe(0);

    await addAddress({
      address: addressData,
      id: user!._id,
      defaultAddress: false,
    });

    const user1 = await User.findOne().lean();

    expect(user1?.addresses?.length).toBe(1);
    expect(user1?.version).toBe(1);
  });

  it('should add address  and also update default address if default is specified', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.addresses?.length).toBe(0);
    expect(user?.defaultAddress?.name).toBe(undefined);

    await addAddress({
      address: addressData,
      id: user!._id,
      defaultAddress: true,
    });

    const user1 = await User.findOne().lean();

    expect(user1?.addresses?.length).toBe(1);
    expect(user1?.defaultAddress?.name).toBe('office 23');
    expect(user1?.version).toBe(1);
  });

  it('should consider adding address to address book if default is not mentioned', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.addresses?.length).toBe(0);

    await addAddress({ address: addressData, id: user!._id });

    const user1 = await User.findOne().lean();
    expect(user1?.version).toBe(1);

    expect(user1?.addresses?.length).toBe(1);
  });

  it('should return null if no user is found', async () => {
    const res = await addAddress({
      address: addressData,
      id: Types.ObjectId().toString(),
    });
    expect(res).toBe(null);
  });
});
