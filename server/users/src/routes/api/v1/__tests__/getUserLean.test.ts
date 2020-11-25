import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Get user lean route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .get('/api/v1/users/lean')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should return lean user data', async () => {
    const token = await global.userLogin();
    const user = await User.findOne().lean();
    const res = await request(app)
      .get('/api/v1/users/lean')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.name).toBe(user?.name);
    expect(res.body.addresses).toBe(undefined);
  });
});
