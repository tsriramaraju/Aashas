import {
  BadRequestError,
  isAdmin,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { getBanner } from '../../../services/getSalesBanner';
import { removeBanner } from '../../../services/removeBanner';

const router = Router();

/**
 *  @desc      get existing Banner
 *  @route     get /api/v1/designer/banner
 *  @access    Admin
 *  @returns   banners
 */

router.get('/banner', async (req: Request, res: Response) => {
  const banners = await getBanner();

  res.status(201).json(banners);
});

export { router as getBannersRouter };
