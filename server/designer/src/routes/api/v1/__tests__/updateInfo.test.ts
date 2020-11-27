import request from 'supertest';
import { app } from '../../../../app';
describe('Update info route test group', () => {
  it('should throw authorization error if non admin access this route', async () => {});

  it('should update info if admin updates with valid parameters', async () => {
    const designer = await global.createDesigner();

    const res = await request(app)
      .put('/api/v1/designer')
      .send({ name: 'updated' })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.msg).toBe('Info updated successfully');
  });

  it('should throw Bad request error if invalid parameters are submitted', async () => {});
});
