import { generateOTP } from '../generateOTP';
it('should generate 4 digit OTP', () => {
  expect(generateOTP().toString()).toMatch(/^[0-9]{4}$/);
});
