import { checkAvailability } from '../checkAvailability';
import { authType } from '@aashas/common';
import { Account } from '../../models/Accounts';

const build = async () => {
  await new Account({
    email: 'johndoe@tests.com',
    mobile: 1234567891,
    authType: authType.email,
    lastLogin: Date.now(),
  }).save();
};

describe('Check availability service test group', () => {
  it('should expect true by entering existing email', async () => {
    await build();

    const resp = await checkAvailability('johndoe@tests.com');
    expect(resp).toBe(true);
  });
  it('should expect true by entering existing mobile number', async () => {
    await build();
    const resp = await checkAvailability('john@tests.com');
    expect(resp).toBe(false);
  });

  it('should expect false by entering existing email', async () => {
    await build();
    const resp = await checkAvailability(1234567891);
    expect(resp).toBe(true);
  });
  it('should expect false by entering existing mobile number', async () => {
    await build();
    const resp = await checkAvailability(1234967891);
    expect(resp).toBe(false);
  });
});
