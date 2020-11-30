import {
  BadRequestError,
  isAdmin,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { removeBanner } from '../../../services/removeBanner';

const router = Router();

/**
 *  @desc      remove existing Banner
 *  @route     delete /api/v1/designer/banner
 *  @access    Admin
 *  @returns   status
 */

router.delete('/banner/:id', [isAdmin], async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!Types.ObjectId.isValid(id))
    throw new BadRequestError('Invalid banner id');

  const bannerDoc = await removeBanner(Types.ObjectId(id));

  if (!bannerDoc) throw new ResourceNotFoundError('Banner not found');

  res.status(201).json({ msg: 'Banner deleted successfully' });
});

export { router as removeBannerRouter };
