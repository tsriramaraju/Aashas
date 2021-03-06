import request from 'supertest';
import { app } from '../../../../app';
describe('Get full info route test group', () => {
  it('should return complete designer info', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');

    const res = await request(app)
      .get('/api/v1/designer')

      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.bio).toBe(designer.bio);
    expect(res.body.name).toBe(designer.name);
    expect(res.body.mobile).toBe(designer.mobile);
    expect(res.body.image).toBe(designer.image);
    expect(res.body.email).toBe(designer.email);
    expect(res.body.blogs.length).toBe(designer.blogs.length);
  });

  it('should throw Resource not found error if no account is found', async () => {
    const res = await request(app)
      .get('/api/v1/designer')

      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Designer account not found');
  });
});
