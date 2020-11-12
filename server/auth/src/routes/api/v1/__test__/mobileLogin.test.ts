import { OTPDoc } from '@aashas/common';
import { app } from '../../../../app';
import request from 'supertest';

describe('Mobile login route test group', () => {
  it('should return otp Document on successful entry', async () => {
    const user = await global.register(undefined, 1234567891);

    const res = await request(app)
      .post('/api/v1/auth/login-mobile')
      .send({ mobile: 1234567891 })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toMatch('OTP has been sent to your mobile');
  });

  it('should return not found error on non existing number', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-mobile')
      .send({ mobile: 1234567891 })
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe("Mobile no. doesn't exists");
  });

  it('should return validation error on invalid mobile no.', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-mobile')
      .send({ mobile: 123457891 })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error if no input is given', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-mobile')

      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
});
