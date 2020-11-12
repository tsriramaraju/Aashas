import request from 'supertest';
import { v4 } from 'uuid';
import { app } from '../../../../app';
import { jwtPayload } from '../../../../interfaces';
import { Account } from '../../../../models/Accounts';
import { Reset } from '../../../../models/Reset';
import { decodeJWT } from '../../../../utils/generateJWT';

describe('Password reset route test group', () => {
  it('should return jwt token on successful input ', async () => {
    const user = await global.register();

    await Reset.build({ email: user?.email!, uid: user!.id.toString() }).save();
    const res = await request(app)
      .post(`/api/v1/auth/reset-password/${user!.id}`)
      .send({
        password: 'This is secret',
        email: user?.email,
      })
      .expect('Content-Type', /json/)
      .expect(201);

    const user1 = await Account.findOne({ email: user?.email });

    expect(user?.password).not.toBe(user1?.password);

    expect(typeof res.body).toBe('string');

    const payload = decodeJWT(res.body) as jwtPayload;

    expect(payload.email).toBe(user?.email);
    expect(payload.id).toBe(user?.id);
    expect(payload.name).toBe(user?.name);
    expect(payload.email).toBe(user1?.email);
    expect(payload.id).toBe(user1?.id);
    expect(payload.name).toBe(user1?.name);
  });

  it('should return Validation error on invalid email input ', async () => {
    const user = await global.register();

    const res = await request(app)
      .post(`/api/v1/auth/reset-password/${user!.id}`)
      .send({
        password: 'This is secret',
        email: 'johntest.com',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return Validation error on invalid password input ', async () => {
    const user = await global.register();

    const res = await request(app)
      .post(`/api/v1/auth/reset-password/${user!.id}`)
      .send({
        password: 'Th',
        email: 'john@test.com',
      })
      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return Validation error if no input is given ', async () => {
    const user = await global.register();

    const res = await request(app)
      .post(`/api/v1/auth/reset-password/${user!.id}`)

      .expect('Content-Type', /json/)
      .expect(418);

    expect(res.body.msg).toBe('Validation error, please enter valid inputs');
  });

  it('should return error if reset id is expired ', async () => {
    const res = await request(app)
      .post(`/api/v1/auth/reset-password/2121fg21`)
      .send({
        password: 'This is secret',
        email: 'john@test.com',
      })
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('resetID expired, plz generate again');
  });
});
