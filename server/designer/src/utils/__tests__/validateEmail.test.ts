import { validateEmail } from '../validateEmail';

describe('Validate email util method test group', () => {
  it('should return true on entering valid email', async () => {
    const res = validateEmail('john@test.com');
    expect(res).toBe(true);
  });
  it('should return false on entering inValid email', async () => {
    const res = validateEmail('123');
    expect(res).toBe(false);
  });
  it('should return false on entering inValid email', async () => {
    const res = validateEmail('123@test');
    expect(res).toBe(false);
  });
  it('should return false on entering inValid email', async () => {
    const res = validateEmail('123.com');
    expect(res).toBe(false);
  });
});
