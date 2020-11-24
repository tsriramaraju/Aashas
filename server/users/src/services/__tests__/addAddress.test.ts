import { address } from '@aashas/common';
import { User } from '../../models/Users';
import { addAddress } from '../addAddress';

describe('Add address Service test group', () => {
  it('should add address to user if valid address is given', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.addresses?.length).toBe(0);
    const address: address = {
      name: 'office 23',
      house: 'FF-012, PentHouse',
      location: 'Sparks Ville',
      street: 'NEw hamster Road',
      pin: 530013,
      city: 'vizag',
      state: 'AP',
    };

    await addAddress({ address, id: user!._id, defaultAddress: false });

    const user1 = await User.findOne().lean();

    expect(user1?.addresses?.length).toBe(1);
  });

  it('should add address  and also update default address if default is specified', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.addresses?.length).toBe(0);
    expect(user?.defaultAddress?.name).toBe(undefined);
    const address: address = {
      name: 'office 23',
      house: 'FF-012, PentHouse',
      location: 'Sparks Ville',
      street: 'NEw hamster Road',
      pin: 530013,
      city: 'vizag',
      state: 'AP',
    };

    await addAddress({ address, id: user!._id, defaultAddress: true });

    const user1 = await User.findOne().lean();

    expect(user1?.addresses?.length).toBe(1);
    expect(user1?.defaultAddress?.name).toBe('office 23');
  });

  it('should consider adding address to address book if default is not mentioned', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    expect(user?.addresses?.length).toBe(0);
    const address: address = {
      name: 'office 23',
      house: 'FF-012, PentHouse',
      location: 'Sparks Ville',
      street: 'NEw hamster Road',
      pin: 530013,
      city: 'vizag',
      state: 'AP',
    };

    await addAddress({ address, id: user!._id });

    const user1 = await User.findOne().lean();

    expect(user1?.addresses?.length).toBe(1);
  });
});
