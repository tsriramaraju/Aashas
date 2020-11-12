import { compareHash, hashPassword } from './../hashPassword';

describe('Password hashing test group', () => {
  it('should generate hash password', async () => {
    const hash = await hashPassword('this is top secret');

    expect(typeof hash).toBe('string');
  });

  it('should success in verifying with valid password', async () => {
    const hash = await hashPassword('this is top secret');

    const result = await compareHash('this is top secret', hash);

    expect(result).toBe(true);
  });
  it('should  fail in verifying with invalid password', async () => {
    const hash = await hashPassword('this is top secret');

    const result = await compareHash('this is not a top secret', hash);

    expect(result).toBe(false);
  });
});
