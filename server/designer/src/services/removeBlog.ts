import { DatabaseConnectionError } from '@aashas/common';

import { Designer } from '../models/Designer';

export const removeBlog = async (data: { userId: string; blogId: string }) => {
  try {
    const designer = await Designer.findById(data.userId);

    if (!designer) return 'Designer account not found';
    const updatedBlogs = designer.blogs.filter(
      (blog) => blog._id.toString() !== data.blogId.toString()
    );

    if (updatedBlogs.toString() === designer.blogs.toString())
      return 'Blog not found';

    designer.blogs = updatedBlogs;

    await designer.save();

    return 'Successfully removed';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
