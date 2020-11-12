import request from 'supertest';
import { app } from '../../../../app';
import { jwtPayload } from '../../../../interfaces';
import { OTP } from '../../../../models/OTP';
import { decodeJWT } from '../../../../utils/generateJWT';

describe('Verify Login OTP route test group', () => {
  it('should return invalid error when invalid otp is submitted', async () => {
    const otp = await OTP.build({
      name: 'john',
      otp: 1234,
      mobile: 1234567981,
    }).save();
    const res = await request(app)
      .post(`/api/v1/auth/verify-login`)
      .send({
        mobile: otp.mobile,
        otp: 112,
      })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Enter valid otp');
  });

  it('should return valid JWT token on successful OTP', async () => {
    const user = await global.register('john@test.com', 1234567981);

    const otp = await OTP.build({
      name: 'john',
      otp: 1234,
      mobile: 1234567981,
    }).save();

    const res = await request(app)
      .post(`/api/v1/auth/verify-login`)
      .send({
        mobile: otp.mobile,
        otp: otp.otp,
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(typeof res.body).toBe('string');

    const payload = decodeJWT(res.body) as jwtPayload;

    expect(payload.id).toBe(user?.id);
    expect(payload.name).toBe(user?.name);
  });

  it('should return expiration error on expired otp', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-login`)
      .send({
        mobile: 1234567891,
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('OTP expired, plz generate OTP again');
  });
});
