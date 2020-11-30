import {
  blog,
  DatabaseConnectionError,
  ResourceNotFoundError,
} from '@aashas/common';
import { Types } from 'mongoose';
import { Designer } from '../models/Designer';

export const removeBlog = async (data: {
  userId: Types.ObjectId;
  blogId: Types.ObjectId;
}) => {
  try {
    const designer = await Designer.findById(data.userId);

    if (!designer) return 'Designer account not found';

    const updatedBlogs = designer.blogs.filter(
      (blog) => blog._id.toHexString() !== data.blogId.toHexString()
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
