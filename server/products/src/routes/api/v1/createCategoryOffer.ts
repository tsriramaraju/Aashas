import {
  BadRequestError,
  CategoryOffer,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { isAdmin } from '../../../middlewares/isAdmin';
import { updateCategoryOffer } from '../../../services/updateCategoryOffer';

const router = Router();

/**
 *  @desc      Updates existing products
 *  @route     post /api/v1/products/offers-category
 *  @access    Admin
 *  @returns   Status
 */

router.post(
  '/offers-category',
  [isAdmin],
  async (req: Request, res: Response) => {
    const offer = req.body as CategoryOffer;

    if (offer.discount <= 0 || offer.discount >= 100)
      throw new BadRequestError('Invalid discount');

    if (typeof offer.inOffer !== 'boolean')
      throw new BadRequestError('Invalid offer Type');

    const status = await updateCategoryOffer(offer);
    if (!status) throw new ResourceNotFoundError('Product not found');
    res.status(201).json({ msg: 'Products updated successfully' });
  }

  //  TODO : publish events

  //  TODO : algolia
);

export { router as createCategoryOfferRouter };
