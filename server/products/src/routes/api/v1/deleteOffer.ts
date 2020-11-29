import {
  BadRequestError,
  currentUser,
  isAdmin,
  natsWrapper,
  offer,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  OfferDeletedPublisher,
  ProductUpdatedPublisher,
} from '../../../events';

import { updateProduct } from '../../../services/updateProduct';

const router = Router();

/**
 *  @desc      Updates existing product
 *  @route     delete /api/v1/products/offers/:id
 *  @access    Admin
 *  @returns   Status
 */

router.delete(
  '/offers/:id',
  [currentUser, isAdmin],
  async (req: Request, res: Response) => {
    const prodId = req.params.id;

    if (!Types.ObjectId.isValid(prodId))
      throw new BadRequestError('Invalid product id');

    const offer: offer = {
      discount: 0,
      inOffer: false,
    };

    const product = await updateProduct(Types.ObjectId(prodId), offer);
    if (!product) throw new ResourceNotFoundError('Product not found');
    res.status(201).json({ msg: 'Product updated successfully' });

    //  TODO : publish build website event

    new ProductUpdatedPublisher(natsWrapper.client).publish({
      product,
      version: product.version,
    });

    new OfferDeletedPublisher(natsWrapper.client).publish({
      version: product.version,
      product: product,
    });
  }

  //  TODO : algolia
);

export { router as deleteOfferRouter };
