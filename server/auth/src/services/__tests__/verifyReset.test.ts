import { Types } from 'mongoose';
import { Reset } from '../../models/Reset';
import { Account } from '../../models/Accounts';
import { verifyReset } from './../verifyReset';
import { BadRequestError, ResourceNotFoundError } from '@aashas/common';
describe('Verify Reset service test group ', () => {
  it('should fail if an expired link is used', async () => {
    await expect(
      verifyReset(Types.ObjectId().toHexString(), '1234567891', 'john@test.com')
    ).rejects.toThrowError(ResourceNotFoundError);
  });

  it('should fail if an invalid reset link is used', async () => {
    const id = Types.ObjectId().toHexString();
    const res = await Reset.build({
      uid: id,
      email: 'john@test.com',
    }).save();

    await expect(
      verifyReset(id, '1234567891', 'johna@test.com')
    ).rejects.toThrowError(BadRequestError);
  });

  it('should create update existing password', async () => {
    const account = await global.register();
    const id = Types.ObjectId().toHexString();
    await Reset.build({ email: account?.email!, uid: id }).save();

    await verifyReset(id, 'this is new password', account?.email!);
    const res = await Account.findOne({ email: account?.email });
    expect(res?.email).toBe(account?.email);
    expect(res?.password).not.toBe(account?.password);
  });
});
