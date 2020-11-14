import request from 'supertest';
import { app } from '../../../../app';

it('should return number of accounts available', async () => {
  const token = await global.adminLogin();

  await global.register();
  await global.register();
  await global.register();
  await global.register();
  await global.register();
  await global.register();
  await global.register();

  const res = await request(app)
    .get('/api/v1/auth/super/get')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(201);

  expect(res.body.length).toBe(8);
});
it('should fail route is accessed other than admin', async () => {
  await global.register();
  await global.register();
  await global.register();
  await global.register();
  await global.register();
  await global.register();
  await global.register();

  const res = await request(app)
    .get('/api/v1/auth/super/get')

    .expect('Content-Type', /json/)
    .expect(400);
  expect(res.body.msg).toBe('Authentication token is not present');
});
