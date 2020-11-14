import { checkAvailability } from '../checkAvailability';

describe('Check availability service test group', () => {
  it('should expect true by entering existing email', async () => {
    const user = await global.register();

    const resp = await checkAvailability(user?.email!);
    expect(resp?.id).toBe(user!.id);
  });
  it('should expect true by entering existing mobile number', async () => {
    await global.register();
    const resp = await checkAvailability('john@tests.com');
    expect(resp).toBe(null);
  });

  it('should expect false by entering existing email', async () => {
    const user = await global.register();
    const resp = await checkAvailability(user?.mobile!);
    expect(resp?.id).toBe(user?.id);
  });
  it('should expect false by entering existing mobile number', async () => {
    await global.register();
    const resp = await checkAvailability(1234967891);
    expect(resp).toBe(null);
  });
});
