import { blog } from '@aashas/common';
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
      .post('/api/v1/designer/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should return success message on creating blog successfully', async () => {
    const designer = await global.createDesigner();
    expect(designer.name).toBe('John the admin');
    expect(designer.blogs.length).toBe(0);
    const token = global.adminLogin();
    const res = await request(app)
      .post('/api/v1/designer/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.msg).toBe('Successfully added');

    const postFetch = await Designer.find().lean();

    expect(postFetch[0].blogs[0].content).toBe(blog.content);
    expect(postFetch[0].blogs[0].title).toBe(blog.title);
    expect(postFetch[0].blogs[0].image).toBe(blog.image);
    expect(postFetch[0].blogs[0].slug).toBe(blog.slug);
  });

  it('should throw Resource not found error if no account is found', async () => {
    const token = global.adminLogin();
    const res = await request(app)
      .post('/api/v1/designer/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(res.body.msg).toBe('Designer account not found');
  });
});
