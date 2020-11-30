import { isAdmin, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getDesigner } from '../../../services/getDesigner';

const router = Router();

/**
 *  @desc      Get existing designer blogs
 *  @route     get /api/v1/designer/blogs
 *  @access    Admin
 *  @returns   Designer
 */

router.get('/blogs', [isAdmin], async (req: Request, res: Response) => {
  const { id } = req.currentUser!;

  const blogs = await getDesigner({
    id,
    mode: 'blogs',
  });
  if (!blogs) throw new ResourceNotFoundError('Designer account not found');

  res.status(201).json(blogs);
});

export { router as getBlogsRouter };
