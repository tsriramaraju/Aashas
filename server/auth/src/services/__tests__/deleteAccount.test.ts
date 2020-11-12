import { Types } from 'mongoose';

import { authType } from '@aashas/common';
import { Account } from '../../models/Accounts';
import { deleteAccount } from '../deleteAccount';

const build = async () => {
  return await new Account({
    email: 'johndoe@tests.com',
    mobile: 1234567891,
    authType: authType.email,
    lastLogin: Date.now(),
  }).save();
};

describe('Delete account service test group', () => {
  it('should expect true by deleting valid account', async () => {
    const data = await build();

    const resp = await deleteAccount(data.id);
    expect(resp).toBe(true);
  });
  it('should expect false by deleting in valid account', async () => {
    const data = await build();
    const id = Types.ObjectId();

    const resp = await deleteAccount(id);
    expect(resp).toBe(false);
  });
});
