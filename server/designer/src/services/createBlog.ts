import { blog, DatabaseConnectionError } from '@aashas/common';
import { Types } from 'mongoose';
import { Designer } from '../models/Designer';

export const createBlog = async (data: { id: string; blog: blog }) => {
  try {
    const designer = await Designer.findById(data.id);
    const id = Types.ObjectId().toHexString();
    if (!designer) return null;

    designer.blogs.unshift({ _id: id, ...data.blog });

    await designer.save();

    return 'Successfully added';
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
