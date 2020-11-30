import request from 'supertest';
import { app } from '../../../../app';
import { natsWrapper, jwtPayload } from '@aashas/common';
import { Account } from '../../../../models/Accounts';
import { decodeJWT } from '../../../../utils/generateJWT';

describe('Email signup route tests group', () => {
  it('should register user successfully from valid email credentials and return valid jwt payload', async () => {
    const preFetchUser = await Account.findOne({ email: 'johndoe@test.com' });
    expect(preFetchUser).toBe(null);
    const response = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'john doe',
        email: 'johndoe@test.com',
        password: 'this is secret',
      })
      .expect('Content-Type', /json/)
      .expect(201);
    const user = await Account.findOne({ email: 'johndoe@test.com' });
    expect(user?.name).toBe('john doe');
    expect(typeof response.body).toBe('string');

    const payload = decodeJWT(response.body) as jwtPayload;

    expect(payload.email).toBe(user?.email);
    expect(payload.id).toBe(user?.id);
    expect(payload.name).toBe(user?.name);
  });

  it('should return validation error using invalid email input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'john doe',
        email: 'johndoetest.com',
        password: 'this is secret',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });
  it('should return validation error if no input is submitted', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email-register')

      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error using invalid password input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'john doe',
        email: 'johndoetest.com',
        password: 'oops',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error using input without password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'john doe',
        email: 'johndoetest.com',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error using input without email', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'john doe',
        password: 'this is secret',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error using input without name', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        email: 'johndoetest.com',
        password: 'this is secret',
      })
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return validation error using name less than 3 characters', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'do',
        email: 'johndoetest.com',
        password: 'this is secret',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return Bad request error if email already exists', async () => {
    await request(app).post('/api/v1/auth/email-register').send({
      name: 'john doe',
      email: 'johndoe@test.com',
      password: 'this is secret',
    });
    const res = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'john doe',
        email: 'johndoe@test.com',
        password: 'this is secret',
      })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Email already exists');
  });

  it('should publish ACCOUNT_CREATED and GENERATE_OTP events after registering', async () => {
    const preFetchUser = await Account.findOne({ email: 'johndoe@test.com' });
    expect(preFetchUser).toBe(null);
    const response = await request(app)
      .post('/api/v1/auth/email-register')
      .send({
        name: 'john doe',
        email: 'johndoe@test.com',
        password: 'this is secret',
      })
      .expect('Content-Type', /json/)
      .expect(201);
    const user = await Account.findOne({ email: 'johndoe@test.com' });
    expect(user?.name).toBe('john doe');
    expect(typeof response.body).toBe('string');

    const payload = decodeJWT(response.body) as jwtPayload;

    expect(payload.email).toBe(user?.email);
    expect(payload.id).toBe(user?.id);
    expect(payload.name).toBe(user?.name);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
