import {
  BadRequestError,
  isAdmin,
  natsWrapper,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { BuildWebsitePublisher } from '../../../events';
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

  const bannerDoc = await removeBanner(id);

  if (!bannerDoc) throw new ResourceNotFoundError('Banner not found');

  res.status(201).json({ msg: 'Banner deleted successfully' });

  new BuildWebsitePublisher(natsWrapper.client).publish({
    immediate: false,
    message: 'Sales banner removed',
  });
});

export { router as removeBannerRouter };
