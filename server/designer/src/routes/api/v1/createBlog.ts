import { isAdmin, natsWrapper, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { BuildWebsitePublisher } from '../../../events';
import { createBlog } from '../../../services/createBlog';
import { getDesigner } from '../../../services/getDesigner';

const router = Router();

/**
 *  @desc      Create new blog
 *  @route     post /api/v1/designer/blogs
 *  @access    Admin
 *  @returns   status
 */

router.post('/blogs', [isAdmin], async (req: Request, res: Response) => {
  const { id } = req.currentUser!;
  const blog = req.body;

  const status = await createBlog({ id, blog });

  if (!status) throw new ResourceNotFoundError('Designer account not found');

  res.status(201).json({ msg: status });

  new BuildWebsitePublisher(natsWrapper.client).publish({
    immediate: false,
    message: 'Blog created',
  });
});

export { router as createBlogRouter };
