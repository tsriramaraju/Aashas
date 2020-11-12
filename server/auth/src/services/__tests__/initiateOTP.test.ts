import { OTP } from '../../models/OTP';
import { initiateOTP } from './../initiateOTP';

describe('Initiate OTP service test group', () => {
  it('should create and return OTP Document if email record is not found', async () => {
    const res = await initiateOTP('johndoe@test.com', 'john doe');

    expect(res.email).toBe('johndoe@test.com');
  });

  it('should return existing OTP Document if email record is found', async () => {
    await OTP.build({
      name: 'john doe',
      otp: 1234,
      email: 'johndoe@test.com',
    }).save();

    const res = await initiateOTP('johndoe@test.com', 'john doe');

    expect(res.otp).toBe(1234);
  });
  it('should create and return OTP Document if mobile number record is not found', async () => {
    const res = await initiateOTP(123456791, 'john doe');

    expect(res.mobile).toBe('123456791');
  });

  it('should return existing OTP Document if mobile number record is found', async () => {
    await OTP.build({ name: 'john doe', otp: 1234, mobile: 1234567981 }).save();

    const res = await initiateOTP(1234567981, 'john doe');

    expect(res.otp).toBe(1234);
  });
});
