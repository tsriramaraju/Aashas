import {
  BadRequestError,
  isAdmin,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { createBlog } from '../../../services/createBlog';
import { getDesigner } from '../../../services/getDesigner';
import { removeBlog } from '../../../services/removeBlog';

const router = Router();

/**
 *  @desc      Remove existing blog
 *  @route     delete /api/v1/designer/blogs:id
 *  @access    Admin
 *  @returns   status
 */

router.delete('/blogs/:id', [isAdmin], async (req: Request, res: Response) => {
  const { id } = req.currentUser!;
  const blogId = req.params.id;

  if (!Types.ObjectId.isValid(blogId))
    throw new BadRequestError('Invalid blog id');

  const status = await removeBlog({
    userId: id,
    blogId: Types.ObjectId(blogId),
  });

  if (status !== 'Successfully removed')
    throw new ResourceNotFoundError(status);

  res.status(201).json({ msg: status });
});

export { router as removeBlogRouter };
