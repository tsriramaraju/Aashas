import request from 'supertest';
import { app } from '../../../../app';
describe('Get blogs  route test group', () => {
  it('should return complete list of blogs', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');

    const res = await request(app)
      .get('/api/v1/designer/blogs')

      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.blogs.length).toBe(designer.blogs.length);
  });

  it('should throw Resource not found error if no account is found', async () => {
    const res = await request(app)
      .get('/api/v1/designer/blogs')

      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Designer account not found');
  });
});
