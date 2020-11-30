import request from 'supertest';
import { app } from '../../../../app';
describe('Get info route test group', () => {
  it('should throw authorization error if non admin access this route', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.userLogin();
    const res = await request(app)
      .get('/api/v1/designer/info')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should return designer info', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();
    const res = await request(app)
      .get('/api/v1/designer/info')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.bio).toBe(designer.bio);
    expect(res.body.name).toBe(designer.name);
    expect(res.body.mobile).toBe(designer.mobile);
    expect(res.body.image).toBe(designer.image);
    expect(res.body.email).toBe(designer.email);
  });

  it('should throw Resource not found error if no account is found', async () => {
    const token = global.adminLogin();
    const res = await request(app)
      .get('/api/v1/designer/info')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Designer account not found');
  });
});
