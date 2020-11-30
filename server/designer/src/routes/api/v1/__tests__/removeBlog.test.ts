import { blog } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Designer } from '../../../../models/Designer';

describe('Create blogs  route test group', () => {
  const blog: blog = {
    content: 'this is content',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIO-8BKbV2nGAusCl6lBbi-JG4w9yEde9cA&usqp=CAU',
    slug: 'slug',
    title: 'this is title',
  };
  it('should throw authorization error if non admin access this route', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    const token = global.userLogin();
    const res = await request(app)
      .delete('/api/v1/designer/blogs/:id')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should return success message on deleting blog successfully', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    designer.blogs = [{ _id: Types.ObjectId(), ...blog }];
    await designer.save();

    const preFetch = await Designer.find().lean();

    expect(preFetch[0].blogs.length).toBe(1);
    const token = global.adminLogin();
    const res = await request(app)
      .delete(`/api/v1/designer/blogs/${preFetch[0].blogs[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.msg).toBe('Successfully removed');

    const deleteFetch = await Designer.find().lean();

    expect(deleteFetch[0].blogs.length).toBe(0);
  });

  it('should throw Resource not found error if no account is found', async () => {
    const token = global.adminLogin();
    const res = await request(app)
      .delete(`/api/v1/designer/blogs/${Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Designer account not found');
  });

  it('should throw Resource not found error if no blog id is found', async () => {
    await global.createDesigner();
    const token = global.adminLogin();
    const res = await request(app)
      .delete(`/api/v1/designer/blogs/${Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Blog not found');
  });
  it('should throw Bad Request error if id is invalid', async () => {
    const designer = await global.createDesigner();
    const token = global.adminLogin();
    const res = await request(app)
      .delete('/api/v1/designer/blogs/1221')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Invalid blog id');
  });
});
