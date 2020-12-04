import { isAdmin, natsWrapper, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { BuildWebsitePublisher } from '../../../events';
import { bannerValidation } from '../../../middleware/bannerValidation';
import { createBanner } from '../../../services/createSalesBanner';

const router = Router();

/**
 *  @desc      Create new Banner
 *  @route     post /api/v1/designer/banner
 *  @access    Admin
 *  @returns   status
 */

router.post(
  '/banner',
  [isAdmin, bannerValidation],
  async (req: Request, res: Response) => {
    const banner = req.body;

    const bannerDoc = await createBanner(banner);

    res.status(201).json({ msg: 'Banner created successfully' });

    new BuildWebsitePublisher(natsWrapper.client).publish({
      immediate: false,
      message: 'Sales banner created',
    });
  }
);

export { router as createBannerRouter };
