import {
  CategoryOffer,
  currentUser,
  isAdmin,
  natsWrapper,
  outfit,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import {
  OfferDeletedPublisher,
  ProductUpdatedPublisher,
} from '../../../events';

import { updateCategoryOffer } from '../../../services/updateCategoryOffer';

const router = Router();

/**
 *  @desc      Updates existing products
 *  @route     delete /api/v1/products/category
 *  @access    Admin
 *  @returns   Status
 */

router.delete(
  '/category/remove',
  [currentUser, isAdmin],
  async (req: Request, res: Response) => {
    const outfit = req.body as outfit;

    const offer: CategoryOffer = {
      discount: 0,
      inOffer: false,
      outfit,
    };
    const products = await updateCategoryOffer(offer);
    if (!products) throw new ResourceNotFoundError('Products not found');
    res.status(201).json({ msg: 'Products updated successfully' });

    products.forEach((product) => {
      new ProductUpdatedPublisher(natsWrapper.client).publish({
        product,
        version: product.version,
      });

      new OfferDeletedPublisher(natsWrapper.client).publish({
        version: product.version,
        product: product,
      });
    });
    //  TODO : publish build website event
  }

  //  TODO : algolia
);

export { router as removeCategoryOfferRouter };
