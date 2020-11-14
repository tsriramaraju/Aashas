import request from 'supertest';
import { app } from '../../../../app';
import { OTP } from '../../../../models/OTP';
import { jwtPayload } from '../../../../interfaces';
import { decodeJWT } from '../../../../utils/generateJWT';

describe('Verify Login OTP route test group', () => {
  it('should return Validation error when invalid otp is submitted', async () => {
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
      .expect(418);
    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error if no otp is submitted', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-login`)
      .send({
        mobile: 1234567891,
      })
      .expect('Content-Type', /json/)
      .expect(418);
    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
  it('should return validation error if invalid mobile number is submitted', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-login`)
      .send({
        mobile: 123456891,
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(418);
    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
  it('should return validation error if no mobile number is submitted', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-login`)
      .send({
        otp: 1234,
      })
      .expect('Content-Type', /json/)
      .expect(418);
    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
  it('should return validation error if no input is submitted', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/verify-login`)

      .expect('Content-Type', /json/)
      .expect(418);
    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
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
