import request from 'supertest';
import { app } from '../../../../app';
import { OTP } from '../../../../models/OTP';
import { Account } from '../../../../models/Accounts';
import { decodeJWT } from '../../../../utils/generateJWT';
import { natsWrapper, verification, jwtPayload } from '@aashas/common';

describe('Verify Login OTP route test group', () => {
  it('should return validation when invalid otp is submitted', async () => {
    const otp = await OTP.build({
      name: 'john',
      otp: 1234,
      mobile: 1234567981,
    }).save();
    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        mobile: otp.mobile,
        otp: 112,
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Enter valid otp');
  });

  it('should update account verification status on valid email id input and otp', async () => {
    const user = await global.register();
    expect(user?.emailVerified).toBe(verification.no);

    await OTP.build({
      name: user?.name!,
      otp: 1234,
      email: user?.email,
    }).save();

    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        email: user?.email,
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(201);
    const user1 = await Account.findById(user?.id);

    expect(res.body.msg).toBe('successfully verified');
    expect(user1?.emailVerified).toBe(verification.yes);
  });

  it('should return valid JWT token and create user account  valid mobile number input and otp', async () => {
    const user = await Account.find({});
    expect(user.length).toBe(0);

    await OTP.build({
      name: 'john doe',
      otp: 1234,
      mobile: 1234567891,
    }).save();

    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        mobile: 1234567891,
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(201);
    const user1 = await Account.findOne({ mobile: 1234567891 });
    const users = await Account.find({});

    expect(user1?.mobileVerified).toBe(verification.yes);
    expect(typeof res.body).toBe('string');

    const payload = decodeJWT(res.body) as jwtPayload;

    expect(payload.id).toBe(user1?.id);
    expect(payload.name).toBe(user1?.name);

    expect(users.length).toBe(1);
  });

  it('should return error if otp is not given', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        mobile: 1234567891,
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('Enter valid otp');
  });

  it("should return error if email doesn't exist", async () => {
    await OTP.build({
      name: 'john'!,
      otp: 1234,
    }).save();

    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        email: 'john@test.com',
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(420);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('OTP expired, plz generate OTP again');
  });
  it("should return error if mobile doesn't exist", async () => {
    await OTP.build({
      name: 'john'!,
      otp: 1234,
    }).save();

    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        mobile: 1234567891,
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(420);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('OTP expired, plz generate OTP again');
  });

  it('should return error if invalid OPT is  given', async () => {
    const otp = await OTP.build({
      name: 'john',
      otp: 1237,
      mobile: 1234567981,
    }).save();
    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        mobile: otp.mobile,
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('Invalid OTP');
  });

  it('should return bad request error if both mobile and email parameters are given', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        mobile: 123456791,
        email: 'john@test.com',
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('invalid request, use only one parameter');
  });
  it('should return bad request error if no mobile and email parameters are submitted', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)

      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('invalid request, No valid parameters are found');
  });

  it('should generate ACCOUNT_CREATED event if registered through mobile', async () => {
    const user = await Account.find({});
    expect(user.length).toBe(0);

    await OTP.build({
      name: 'john doe',
      otp: 1234,
      mobile: 1234567891,
    }).save();

    const res = await request(app)
      .post(`/api/v1/auth/verify-register`)
      .send({
        mobile: 1234567891,
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(201);
    const user1 = await Account.findOne({ mobile: 1234567891 });
    const users = await Account.find({});

    expect(user1?.mobileVerified).toBe(verification.yes);
    expect(typeof res.body).toBe('string');

    const payload = decodeJWT(res.body) as jwtPayload;

    expect(payload.id).toBe(user1?.id);
    expect(payload.name).toBe(user1?.name);

    expect(users.length).toBe(1);
    expect(natsWrapper.client.publish).toBeCalledTimes(1);
  });
});
