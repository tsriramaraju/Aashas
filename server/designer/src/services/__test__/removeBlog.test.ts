import { Types } from 'mongoose';
import { blogData } from '../../dummy data/blogData';
import { Designer } from '../../models/Designer';
import { removeBlog } from '../removeBlog';

describe('Remove blog service test group', () => {
  it('should remove blog successfully on valid input', async () => {
    const designer = await global.createDesigner();
    const id = Types.ObjectId().toHexString();
    designer.blogs.unshift({ _id: id, ...blogData });
    const blog = await designer.save();
    const preFetch = await Designer.findOne().lean();
    expect(preFetch?.blogs.length).toBe(1);

    const res = await removeBlog({
      userId: blog.id,
      blogId: blog.blogs[0]._id,
    });

    expect(res).toBe('Successfully removed');
    const postFetch = await Designer.findOne().lean();
    expect(postFetch?.blogs.length).toBe(0);
  });

  it('should return designer not found error on entering  non existing designer input', async () => {
    const res = await removeBlog({
      userId: Types.ObjectId().toHexString(),
      blogId: Types.ObjectId().toHexString(),
    });

    expect(res).toBe('Designer account not found');
  });

  it('should return blog not found on entering non existing blog id', async () => {
    const designer = await global.createDesigner();
    const res = await removeBlog({
      userId: designer.id,
      blogId: Types.ObjectId().toHexString(),
    });

    expect(res).toBe('Blog not found');
  });
});
