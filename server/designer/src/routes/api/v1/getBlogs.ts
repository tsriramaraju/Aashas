import { isAdmin, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getDesigner } from '../../../services/getDesigner';

const router = Router();

/**
 *  @desc      Get existing designer blogs
 *  @route     get /api/v1/designer/blogs
 *  @access    Public
 *  @returns   Designer
 */
router.get('/blogs', async (req: Request, res: Response) => {
  const blogs = await getDesigner('blogs');
  if (!blogs) throw new ResourceNotFoundError('Designer account not found');

  res.status(201).json(blogs);
});

export { router as getBlogsRouter };
