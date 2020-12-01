import request from 'supertest';
import { app } from '../../../../app';
import { Account } from '../../../../models';
import { authType, natsWrapper, verification } from '@aashas/common';

describe('Forgot password route test group', () => {
  it('should send reset link', async () => {
    const user = await global.register();

    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: user?.email })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(natsWrapper.client.publish).toBeCalledTimes(1);

    expect(res.body.msg).toBe('Reset link have been sent to your email.');
  });

  it('should give validation error on invalid email input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: 'johndoetest.com' })
      .expect('Content-Type', /json/)
      .expect(418);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
  it('should give validation error if no input is given', async () => {
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')

      .expect('Content-Type', /json/)
      .expect(418);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should not found error on using non existing email input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: 'johndoe@test.com' })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe("Email doesn't exists");
  });

  it('should give Bad request error if user registered through google oauth', async () => {
    const user = await Account.googleBuild({
      authType: authType.google,
      email: 'john@test.com',
      emailVerified: verification.yes,
      googleID: 'some random id',
      lastLogin: Date.now().toString(),
      name: 'john',
    }).save();
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: user.email })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe(
      'This email is registered with google oauth, please use google signIn'
    );
  });
  it('should give Bad request error if user registered through facebook oauth', async () => {
    const user = await Account.facebookBuild({
      authType: authType.facebook,
      email: 'john@test.com',
      emailVerified: verification.yes,
      facebookID: 'some random id',
      lastLogin: Date.now().toString(),
      name: 'john',
    }).save();
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: user.email })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe(
      'This email is registered with facebook oauth, please use facebook signIn'
    );
  });

  it('should send GENERATE_REST event after a successful entry', async () => {
    const user = await global.register();

    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: user?.email })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(natsWrapper.client.publish).toBeCalledTimes(1);

    expect(res.body.msg).toBe('Reset link have been sent to your email.');
  });
});
