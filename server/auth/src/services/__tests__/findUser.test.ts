import { findUser } from './../findUser';
import { authType } from '@aashas/common';
import { Account } from '../../models/Accounts';

describe('Find user service test group', () => {
  const build = async () => {
    return await new Account({
      email: 'johndoe@tests.com',
      mobile: 1234567891,
      authType: authType.email,
      lastLogin: Date.now(),
    }).save();
  };

  it('should return user details with existing email id ', async () => {
    const data = await build();
    const result = await findUser(data.email!);

    expect(result!.email).toBe(data.email);
  });

  it('should return null with non existing email id ', async () => {
    await build();
    const result = await findUser('john@test.com');

    expect(result).toBe(null);
  });
  it('should return user details with mobile number ', async () => {
    const data = await build();
    const result = await findUser(data.mobile!);

    expect(result!.mobile).toBe(data.mobile);
  });
  it('should return null with non existing mobile no. ', async () => {
    await build();
    const result = await findUser(1234567981);

    expect(result).toBe(null);
  });
});
