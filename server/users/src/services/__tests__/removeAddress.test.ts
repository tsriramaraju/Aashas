import { address } from '@aashas/common';
import { User } from '../../models/Users';
import { addAddress } from '../addAddress';
import { removeAddress } from '../removeAddress';

describe('Remove address service test group', () => {
  it('should remove address with the given address id', async () => {
    await global.userLogin();
    const address: address = {
      name: 'office 23',
      house: 'FF-012, PentHouse',
      location: 'Sparks Ville',
      street: 'NEw hamster Road',
      pin: 530013,
      city: 'vizag',
      state: 'AP',
    };

    const user = await User.findOne().lean();
    await addAddress({ address, id: user!._id, defaultAddress: false });
    await addAddress({ address, id: user!._id, defaultAddress: true });
    await addAddress({ address, id: user!._id, defaultAddress: false });

    const user1 = await User.findOne().lean();

    expect(user1?.addresses?.length).toBe(3);

    const result = await removeAddress({
      addressId: user1!.addresses![1]._id!,
      userId: user1!._id,
    });

    expect(result).toBe('Removed address successfully');
    const user2 = await User.findOne().lean();

    expect(user2?.addresses?.length).toBe(2);
  });
});
