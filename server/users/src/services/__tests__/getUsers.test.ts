import { address } from '@aashas/common';
import { User } from '../../models/Users';
import { addAddress } from '../addAddress';
import { getUser } from '../getUsers';

describe('Get user service test group', () => {
  it('should return complete user data if lean is false', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    const address: address = {
      name: 'office 23',
      house: 'FF-012, PentHouse',
      location: 'Sparks Villa',
      street: 'NEw hamster Road',
      pin: 530013,
      city: 'USA',
      state: 'AP',
    };

    await addAddress({ address, id: user!._id, defaultAddress: false });

    const res = await getUser(user?._id, false);

    expect(res?._id.toString()).toBe(user?._id.toString());
    expect(res!.addresses!.length).toBe(1);
  });
  it('should return lean user data if lean is true', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    const address: address = {
      name: 'office 23',
      house: 'FF-012, PentHouse',
      location: 'Sparks Villa',
      street: 'NEw hamster Road',
      pin: 530013,
      city: 'USA',
      state: 'AP',
    };

    await addAddress({ address, id: user!._id, defaultAddress: false });

    const res = await getUser(user?._id, true);
    expect(res?._id.toString()).toBe(user?._id.toString());
    expect(res!.addresses).toBe(undefined);
  });
});
