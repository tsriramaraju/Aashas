import request from 'supertest';
import { app } from '../../../../app';
import { natsWrapper, verification } from '@aashas/common';

describe('Resend OTP route test group', () => {
  it('should return validation error on invalid email input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/resend-otp')
      .send({
        email: 'johntest.com',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
  it('should return validation error with no input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/resend-otp')

      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return bad request error on entering non existing email ', async () => {
    const res = await request(app)
      .post('/api/v1/auth/resend-otp')
      .send({
        email: 'john@test.com',
      })
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe("Email doesn't exists");
  });

  it('should return success message on valid inputs', async () => {
    const user = await global.register();

    const res = await request(app)
      .post('/api/v1/auth/resend-otp')
      .send({
        email: user?.email,
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toBe('OTP has been sent to your email');
  });

  it('should send event on valid submission', async () => {
    const user = await global.register();

    const res = await request(app)
      .post('/api/v1/auth/resend-otp')
      .send({
        email: user?.email,
      })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toBe('OTP has been sent to your email');

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
  it('should throw bad request error if email is already verified', async () => {
    const user = await global.register();
    if (user) {
      user.emailVerified = verification.yes;
      await user.save();

      const res = await request(app)
        .post('/api/v1/auth/resend-otp')
        .send({
          email: user.email,
        })
        .expect('Content-Type', /json/)
        .expect(400);
      expect(res.body.msg).toBe('Email already verified');
    }
  });
});
