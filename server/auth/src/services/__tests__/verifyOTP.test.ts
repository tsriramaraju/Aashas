import {
  verification,
  BadRequestError,
  ResourceNotFoundError,
} from '@aashas/common';
import { Account } from '../../models/Accounts';
import { OTP } from '../../models/OTP';
import { verifyOTP } from './../verifyOTP';

describe('Verify OTP service test group', () => {
  it('should fail if an expired otp is used', async () => {
    await expect(verifyOTP(1234, 1234567891)).rejects.toThrowError(
      ResourceNotFoundError
    );
  });

  it('should fail if an invalid otp is used', async () => {
    const res = await OTP.build({
      name: 'name',
      otp: 1234,
      mobile: 1234567891,
    }).save();

    await expect(verifyOTP(1122, 1234567891)).rejects.toThrowError(
      BadRequestError
    );
  });

  it('should update user document to verified if valid email and otp are submitted', async () => {
    await global.register('john@test.com');
    const data = await Account.findOne({ email: 'john@test.com' });

    expect(data?.email).toBe('john@test.com');
    expect(data?.emailVerified).toBe(verification.no);
    await OTP.build({
      name: 'john',
      otp: 1234,
      email: 'john@test.com',
    }).save();
    await verifyOTP(1234, 'john@test.com');
    const res = await Account.findOne({ email: 'john@test.com' });

    expect(res?.email).toBe('john@test.com');
    expect(res?.emailVerified).toBe(verification.yes);
  });

  it('should Create  a user document if valid otp and mobile number is submitted', async () => {
    const data = await Account.find({});
    expect(data.length).toBe(0);

    await OTP.build({ name: 'john', otp: 1234, mobile: 1234567891 }).save();
    const res = await verifyOTP(1234, 1234567891);

    expect(res?.mobile).toBe(1234567891);
    const response = await Account.find({});
    expect(response.length).toBe(1);

    expect(response[0].mobileVerified).toBe(verification.yes);
  });

  it('should return existing user document if already exists', async () => {
    const account = await global.register('adfs@sdff.com', 1234567891);

    await OTP.build({ name: 'john', otp: 1234, mobile: 1234567891 }).save();
    const res = await verifyOTP(1234, 1234567891);

    expect(res?.mobile).toBe(1234567891);
    expect(res?.mobileVerified).toBe(verification.no);
    expect(JSON.stringify(account) == JSON.stringify(res)).toBe(true);
  });
});
