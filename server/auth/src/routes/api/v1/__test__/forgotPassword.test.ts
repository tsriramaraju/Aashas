import { app } from '../../../../app';
import request from 'supertest';
import { natsWrapper } from '@aashas/common';

describe('Forgot password route test group', () => {
  it('should send reset link', async () => {
    const user = await global.register();

    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: user?.email })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    expect(res.body.msg).toBe('Reset link have been sent to your email.');
  });

  it('should give validation error on invalid email input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: 'johndoetest.com' })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
  it('should give validation error if no input is given', async () => {
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')

      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should not found error on using non existing email input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/forgot-email')
      .send({ email: 'johndoe@test.com' })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe("Email doesn't exists");
  });
});
