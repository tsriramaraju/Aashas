import { User } from '../../models/Users';
import { updateProfilePic } from '../updateProfilePic';

describe('Update profile picture service test group', () => {
  it('should update profile picture with valid input', async () => {
    await global.userLogin();
    const user = await User.findOne();

    await updateProfilePic({ id: user?.id!, pic: 'this is image' });

    const user1 = await User.findOne().lean();

    expect(user1?.image).toBe('this is image');
    expect(user1?.version).toBe(1);
  });

  it('should remove profile pic if no input is given', async () => {
    await global.userLogin();
    const user = await User.findOne();
    user!.image = 'this is image';
    await user?.save();
    const user2 = await User.findOne().lean();
    expect(user2?.image).toBe('this is image');

    await updateProfilePic({ id: user?.id! });

    const user1 = await User.findOne().lean();

    expect(user1?.image).toBe(undefined);
    expect(user1?.version).toBe(2);
  });
});
