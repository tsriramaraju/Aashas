import { BadRequestError, ResourceNotFoundError } from '@aashas/common';
import { v4 } from 'uuid';
import { Account } from '../../models/Accounts';
import { Reset } from '../../models/Reset';
import { verifyReset } from './../verifyReset';
describe('Verify Reset service test group ', () => {
  it('should fail if an expired link is used', async () => {
    await expect(
      verifyReset('1234', '1234567891', 'john@test.com')
    ).rejects.toThrowError(ResourceNotFoundError);
  });

  it('should fail if an invalid reset link is used', async () => {
    const res = await Reset.build({
      uid: 'name',
      email: 'john@test.com',
    }).save();

    await expect(
      verifyReset('name', '1234567891', 'johna@test.com')
    ).rejects.toThrowError(BadRequestError);
  });

  it('should create update existing password', async () => {
    const account = await global.register();
    const id = v4();
    await Reset.build({ email: account?.email!, uid: id }).save();

    await verifyReset(id, 'this is new password', account?.email!);
    const res = await Account.findOne({ email: account?.email });
    expect(res?.email).toBe(account?.email);
    expect(res?.password).not.toBe(account?.password);
  });
});
