import { decodeJWT } from './../../../../utils/generateJWT';

import request from 'supertest';
import { app } from '../../../../app';
import { jwtPayload } from '../../../../interfaces';
import { Account } from '../../../../models';

describe('Email login route test group', () => {
  it('should update last login and return jwt on valid email and password input', async () => {
    const user = await global.register();

    const res = await request(app)
      .post('/api/v1/auth/login-email')
      .send({ email: user?.email, password: 'this is secret' })
      .expect('Content-Type', /json/)
      .expect(201);

    const postFetchUser = await Account.findById(user?.id);

    expect(+user?.lastLogin!).toBeLessThan(+postFetchUser?.lastLogin!);
    const payload = decodeJWT(res.body) as jwtPayload;

    expect(payload.email).toBe(user?.email);
    expect(payload.id).toBe(user?.id);
    expect(payload.name).toBe(user?.name);
  });

  it('should return validation error on entering invalid email and password input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-email')
      .send({ email: 'johndoetest.com', password: 't' })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error  on not entering any input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-email')

      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error  on entering invalid email input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-email')
      .send({ email: 'johndoetest.com', password: 'this is secret' })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error  on entering invalid  password input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-email')
      .send({ email: 'johndoetest.com', password: 't' })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return Not found error on entering non existing email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login-email')
      .send({ email: 'johndoe@test.com', password: 'this is secret' })
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('User not found');
  });

  it('should return invalid password on entering wrong password input', async () => {
    const user = await global.register();

    const res = await request(app)
      .post('/api/v1/auth/login-email')
      .send({ email: user?.email, password: 'this is secrets' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid password');
  });
});
