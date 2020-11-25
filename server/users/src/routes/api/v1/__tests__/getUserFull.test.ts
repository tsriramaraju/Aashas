import request from 'supertest';
import { app } from '../../../../app';

describe('Get user full route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .get('/api/v1/users/')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should return complete user data', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.addresses.length).toBe(0);
  });
});
