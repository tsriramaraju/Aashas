import { Types } from 'mongoose';
import { blogData } from '../../dummy data/blogData';
import { createBlog } from '../createBlog';

describe('Create blog service test group', () => {
  it('should create blog successfully on entering valid details', async () => {
    const designer = await global.createDesigner();

    const status = await createBlog({ id: designer.id, blog: blogData });
    expect(status).toBe('Successfully added');
  });

  it('should return null if designer is not found', async () => {
    const status = await createBlog({ id: Types.ObjectId(), blog: blogData });
    expect(status).toBe(null);
  });
});
