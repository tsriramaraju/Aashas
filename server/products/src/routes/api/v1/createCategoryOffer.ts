import {
  BadRequestError,
  CategoryOffer,
  isAdmin,
  natsWrapper,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import {
  OfferCreatedPublisher,
  ProductUpdatedPublisher,
} from '../../../events';
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

    const products = await updateCategoryOffer(offer);
    if (!products) throw new ResourceNotFoundError('Products not found');
    res.status(201).json({ msg: 'Products updated successfully' });

    products.forEach((product) => {
      new ProductUpdatedPublisher(natsWrapper.client).publish({
        product,
        version: product.version,
      });

      new OfferCreatedPublisher(natsWrapper.client).publish({
        version: product.version,
        product: product,
        mode: 'email',
        data: {
          body: 'Offer added',
          message: 'hello',
        },
      });
    });
    //  TODO : publish build website event
  }

  //  TODO : publish events

  //  TODO : algolia
);

export { router as createCategoryOfferRouter };
