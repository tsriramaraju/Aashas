import request from 'supertest';
import { app } from '../../../../app';
import { Designer } from '../../../../models/Designer';
describe('Update info route test group', () => {
  it('should throw authorization error if non admin access this route', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.userLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ name: 'updated' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should update info if admin updates with valid parameters', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ name: 'updated' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Info updated successfully');
    const postFetch = await Designer.find();
    expect(postFetch[0].name).toBe('updated');
  });

  it('should update info if admin updates with valid parameters', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ name: 'updated', email: 'updated@test.com' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body.msg).toBe('Info updated successfully');

    const postFetch = await Designer.find();
    expect(postFetch[0].name).toBe('updated');
    expect(postFetch[0].email).toBe('updated@test.com');
  });
  it('should throw resource not found error if no data if account id is not present', async () => {
    const token = global.adminLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ name: 'updated' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Designer account not found');
  });

  it('should throw Bad request error if invalid name is submitted', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.adminLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ name: 123 })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Entered name is not String');
  });
  it('should throw Bad request error if invalid email is submitted', async () => {
    await global.createDesigner();
    const token = global.adminLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ email: 123 })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Entered email is not valid email');
  });
  it('should throw Bad request error if invalid bio is submitted', async () => {
    await global.createDesigner();
    const token = global.adminLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ bio: 123 })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Entered bio is not String');
  });
  it('should throw Bad request error if invalid mobile is submitted', async () => {
    await global.createDesigner();
    const token = global.adminLogin();
    const res = await request(app)
      .put('/api/v1/designer')
      .send({ mobile: '123' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Entered mobile is not Number');
  });
});
